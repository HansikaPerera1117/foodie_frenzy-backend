import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartPersistenceModule } from './infrastructure/cart-persistence.module';

@Module({
  imports: [CartPersistenceModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
