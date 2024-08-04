import { Module } from '@nestjs/common';
import { StaffAbstractRepository } from './repositories/staff.abstract.repository';
import { StaffRepository } from './repositories/staff.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './entites/staff.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity, UserEntity])],
  providers: [
    {
      provide: StaffAbstractRepository,
      useClass: StaffRepository,
    },
  ],
  exports: [StaffAbstractRepository],
})
export class StaffPersistenceModule {}
