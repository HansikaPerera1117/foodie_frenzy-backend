import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from './user.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';
import { StatusEnum } from 'src/common/enum/status.enum';

@Injectable()
export class UserRepository implements UserAbstractRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
 
 
  // findByContactDetails(data: any) {
  //  return await this.user
  // }
  async findById(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        status: In([StatusEnum.ACTIVE, StatusEnum.INACTIVE]),
        id: userId,
      },
      relations: {
        staff: true,
        customer: true,
        role: true,
      },
    });
    return UserMapper.toDomain(user);
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        status: In([StatusEnum.ACTIVE, StatusEnum.INACTIVE]),
        email: email,
      },
      relations: {
        staff: true,
        customer: true,
        role: true,
      },
    });
    return UserMapper.toDomain(user);
  }

  async findByEmailAndPasswd(email: string, password: string) {
    await this.userRepository.findOne({
      where: {},
    });
  }
}
