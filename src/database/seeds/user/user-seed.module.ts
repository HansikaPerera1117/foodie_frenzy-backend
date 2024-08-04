import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeedService } from './user-seed.service';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { StaffEntity } from 'src/staff/infrastructure/entites/staff.entity';
import { RoleEntity } from 'src/role-permission-management/role/infrastructure/entites/role.entity';
import { RolePermissionEntity } from 'src/role-permission-management/role-permission/infrastructure/entites/role-permission.entity';
import { PermissionEntity } from 'src/role-permission-management/permission/infrastructure/entites/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, StaffEntity, RoleEntity,RolePermissionEntity,PermissionEntity])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
