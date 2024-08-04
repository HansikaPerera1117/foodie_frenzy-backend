import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionPersistenceModule } from './permission-persistence.module';

@Module({
  imports:[PermissionPersistenceModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
