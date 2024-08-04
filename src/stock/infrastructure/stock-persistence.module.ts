import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entites/stock.entity';
import { StockAbstractRepository } from './repositories/stock.abstract.repository';
import { StockRepository } from './repositories/stock.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  providers: [
    {
      provide: StockAbstractRepository,
      useClass: StockRepository,
    },
  ],
  exports: [StockAbstractRepository],
})
export class StockPersistenceModule {}
