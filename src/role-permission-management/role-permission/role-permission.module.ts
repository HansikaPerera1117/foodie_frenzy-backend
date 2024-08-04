import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionPersistenceModule } from './infrastructure/role-permission.module';


@Module({
  imports: [RolePermissionPersistenceModule],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
