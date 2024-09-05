import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAbstractRepository } from './repositories/order.abstract.repository';
import { OrderRepository } from './repositories/order.repository';
import { OrderEntity } from './entites/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],

  providers: [
    {
      provide: OrderAbstractRepository,
      useClass: OrderRepository,
    },
  ],
  exports: [OrderAbstractRepository],
})
export class OrderPersistenceModule {}
