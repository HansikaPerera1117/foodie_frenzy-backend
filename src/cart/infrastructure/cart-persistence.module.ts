import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entites/cart.entity';
import { CartAbstractRepository } from './repositories/cart.abstract.repository';
import { CartRepository } from './repositories/cart.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [
    {
      provide: CartAbstractRepository,
      useClass: CartRepository,
    },
  ],
  exports: [CartAbstractRepository],
})
export class CartPersistenceModule {}
