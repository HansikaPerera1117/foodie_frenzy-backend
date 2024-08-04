import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StaffAbstractRepository } from './infrastructure/repositories/staff.abstract.repository';

import { TransactionService } from 'src/transaction/transaction.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UserService } from 'src/user/user.service';
import { StatusEnum } from 'src/common/enum/status.enum';
import { StaffFiltersDto } from './dto/staff-filters.dto';

@Injectable()
export class StaffService {
  constructor(
    private readonly staffRepository: StaffAbstractRepository,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
  ) {}

  findOne(staffId: string) {
    return this.staffRepository.findOne(staffId);
  }

  findAll(filters: StaffFiltersDto) {
    return this.staffRepository.findAll(filters);
  }

  async create(data: CreateStaffDto) {
    const isExists = await this.userService.findByEmail(data.email);
    if (!isExists) {
      return this.transactionService.createStaff(data);
    } else if (isExists.user.status === StatusEnum.ACTIVE) {
      throw new HttpException(
        `${data.email} is alredy exists in active list`,
        HttpStatus.CONFLICT,
      );
    } else if (isExists.user.status === StatusEnum.INACTIVE) {
      throw new HttpException(
        `${data.email} is alredy exists in inactive list,activate please`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(staffId: string, data: any) {
    // const isExists = await this.findOne(staffId);
    return this.staffRepository.update(staffId, data);
  }
}
