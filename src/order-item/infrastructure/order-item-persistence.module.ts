import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemAbstractRepository } from './repositories/order-item.abstract.repository';
import { OrderItemRepository } from './repositories/order-item.repository';

@Module({
  providers: [
    {
      provide: OrderItemAbstractRepository,
      useClass: OrderItemRepository,
    },
  ],
  exports: [OrderItemAbstractRepository],
})
export class OrderItemPersistenceModule {}
