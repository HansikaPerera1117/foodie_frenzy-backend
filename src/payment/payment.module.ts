import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentPersistenceModule } from './infrastructure/payment-persistence.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    PaymentPersistenceModule,
    // TransactionModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
