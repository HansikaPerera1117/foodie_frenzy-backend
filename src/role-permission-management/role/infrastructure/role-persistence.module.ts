import { Module } from '@nestjs/common';
import { RoleAbstractRepository } from './repositories/role.abstract.repository';
import { RoleRepository } from './repositories/role.repository';
import { RoleEntity } from './entites/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionEntity } from 'src/role-permission-management/role-permission/infrastructure/entites/role-permission.entity';
import { PermissionEntity } from 'src/role-permission-management/permission/infrastructure/entites/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      RolePermissionEntity,
      PermissionEntity,
    ]),
  ],
  providers: [
    {
      provide: RoleAbstractRepository,
      useClass: RoleRepository,
    },
  ],
  exports: [RoleAbstractRepository],
})
export class RolePersistenceModule {}
