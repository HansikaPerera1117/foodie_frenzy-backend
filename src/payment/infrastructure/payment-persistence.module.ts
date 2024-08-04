import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAbstractRepository } from './repositories/payment.abstract.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentEntity } from './entites/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  providers: [
    {
      provide: PaymentAbstractRepository,
      useClass: PaymentRepository,
    },
  ],
  exports: [PaymentAbstractRepository],
})
export class PaymentPersistenceModule {}
