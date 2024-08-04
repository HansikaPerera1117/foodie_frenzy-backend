import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockPersistenceModule } from './infrastructure/stock-persistence.module';

@Module({
  imports: [StockPersistenceModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
