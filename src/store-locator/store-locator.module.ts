import { Module } from '@nestjs/common';
import { StoreLocatorService } from './store-locator.service';
import { StoreLocatorController } from './store-locator.controller';
import { StoreLocatorPersistenceModule } from './infrastructure/store-locator-persistence.module';

@Module({
  imports: [StoreLocatorPersistenceModule],
  controllers: [StoreLocatorController],
  providers: [StoreLocatorService],
})
export class StoreLocatorModule {}
