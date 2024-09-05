import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TransactionModule } from 'src/transaction/transaction.module';
import { OrderPersistenceModule } from './infrastructure/order-persistence.module';

@Module({
  imports: [TransactionModule, OrderPersistenceModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
