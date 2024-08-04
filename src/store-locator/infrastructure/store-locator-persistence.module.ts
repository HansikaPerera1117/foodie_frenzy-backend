import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreLocatorAbstractRepository } from './repositories/store-locator.abstract.repository';
import { StoreLocatorRepository } from './repositories/store-locator.repository';
import { StoreLocatorEntity } from './entites/store-locator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreLocatorEntity])],
  providers: [
    {
      provide: StoreLocatorAbstractRepository,
      useClass: StoreLocatorRepository,
    },
  ],
  exports: [StoreLocatorAbstractRepository],
})
export class StoreLocatorPersistenceModule {}
