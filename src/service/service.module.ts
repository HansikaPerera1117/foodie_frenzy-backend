import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServicePersistenceModule } from './infrastructure/service-persistence.module';

@Module({
  imports: [ServicePersistenceModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
