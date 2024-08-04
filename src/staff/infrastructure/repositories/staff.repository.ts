import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StaffAbstractRepository } from './staff.abstract.repository';
import { Repository } from 'typeorm';
import { StaffEntity } from '../entites/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffMapper } from '../mappers/staff.mapper';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { StaffFiltersDto } from 'src/staff/dto/staff-filters.dto';
import { StatusEnum } from 'src/common/enum/status.enum';

@Injectable()
export class StaffRepository implements StaffAbstractRepository {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(filters: StaffFiltersDto) {
    const perPage = filters.perPage || 10;
    const page = filters.page || 1;
    const queryBuilder = this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.file', 'file');



    if (filters.name) {
      queryBuilder.andWhere(
        '(user.firstName ILIKE :name OR user.lastName ILIKE :name)',
        { name: `%${filters.name}%` },
      );
    }
    if (filters.email) {
      queryBuilder.andWhere('user.email ILIKE :email', {
        email: `%${filters.email}%`,
      });
    }
    if (filters.roleId) {
      queryBuilder.andWhere('user.roleId = :roleId', {
        roleId: filters.roleId,
      });
    }

    if (filters.status !== undefined) {
      if (filters.status === 0 || isNaN(filters.status)) {
        queryBuilder.andWhere('user.status IN (:...statuses)', {
          statuses: [StatusEnum.ACTIVE, StatusEnum.INACTIVE],
        });
      } else {
        queryBuilder.andWhere('user.status = :status', {
          status: filters.status,
        });
      }
    }

    const [allStaff, totalCount] = await queryBuilder
      .take(perPage)
      .skip((page - 1) * perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;

    return {
      totalCount,
      hasNextPage,
      totalPages,
      currentPage: page,
      data: StaffMapper.toDomain(allStaff),
    };
  }

  async findOne(staffId: string) {
    const staff = await this.staffRepository.findOne({
      where: { id: staffId },
      select: ['id'],
      relations: ['user'],
    });
    return await StaffMapper.toDomain(staff);
  }

  async update(staffId: string, data: any) {
    console.log(data);

    try {
      // Find the staff member by ID with its related user
      const staff = await this.staffRepository.findOne({
        where: { id: staffId },
        relations: ['user'],
      });

      if (!staff) {
        throw new HttpException('Unable to find staff', HttpStatus.NOT_FOUND);
      }

      // Update staff properties
      staff.contactNo = data.contactNo;

      // Update the related user properties if provided
      if (data.user && staff.user) {
        staff.user.firstName = data.firstName;
        staff.user.lastName = data.lastName;
        // staff.user.email = data.email;
        staff.user.status = data.status;
        staff.user.role = data.roleId;
        await this.userRepository.save(staff.user);
      }

      // Save the updated staff entity
      const updatedStaff = await this.staffRepository.save(staff);
      return updatedStaff;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
