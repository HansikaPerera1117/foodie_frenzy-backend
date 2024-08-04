import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RolePersistenceModule } from './infrastructure/role-persistence.module';

@Module({
  imports: [RolePersistenceModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
