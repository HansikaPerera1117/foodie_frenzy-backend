import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entites/service.entity';
import { ServiceAbstractRepository } from './repositories/service.abstract.repository';
import { ServiceRepository } from './repositories/service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [
    {
      provide: ServiceAbstractRepository,
      useClass: ServiceRepository,
    },
  ],
  exports: [ServiceAbstractRepository],
})
export class ServicePersistenceModule {}
