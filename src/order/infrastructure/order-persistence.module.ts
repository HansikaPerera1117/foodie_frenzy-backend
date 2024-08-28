import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAbstractRepository } from './repositories/order.abstract.repository';
import { OrderRepository } from './repositories/order.repository';

@Module({
  providers: [
    {
      provide: OrderAbstractRepository,
      useClass: OrderRepository,
    },
  ],
  exports: [OrderAbstractRepository],
})
export class OrderPersistenceModule {}
