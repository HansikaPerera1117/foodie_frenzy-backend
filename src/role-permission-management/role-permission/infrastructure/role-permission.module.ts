import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionAbstractRepository } from './repositories/role-permission.abstract.repository';
import { RolePermissionRepository } from './repositories/role-permission.repository';
import { RolePermissionEntity } from './entites/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionEntity])],
  providers: [
    {
      provide: RolePermissionAbstractRepository,
      useClass: RolePermissionRepository,
    },
  ],
  exports: [RolePermissionAbstractRepository],
})
export class RolePermissionPersistenceModule {}
