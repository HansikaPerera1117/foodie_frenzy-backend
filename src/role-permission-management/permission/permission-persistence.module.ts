import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './infrastructure/entites/permission.entity';
import { PermissionAbstractRepository } from './infrastructure/repositories/permission.abstract.repository';
import { PermissionRepository } from './infrastructure/repositories/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    {
      provide: PermissionAbstractRepository,
      useClass: PermissionRepository,
    },
  ],
  exports: [PermissionAbstractRepository],
})
export class PermissionPersistenceModule {}
