import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { DiscountPersistenceModule } from './infrastructure/discount-persistence.module';

@Module({
  imports: [DiscountPersistenceModule],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
