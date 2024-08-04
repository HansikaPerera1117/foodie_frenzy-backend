import { Module } from '@nestjs/common';
import { TransactionAbstractRepository } from './repositories/transaction.abstract.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { SeylanMastercardModule } from 'src/services/payment-gateways/seylan-mastercard/seylan-mastercard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
 
    ]),
    SeylanMastercardModule,
    MailModule,
  ],
  providers: [
    {
      provide: TransactionAbstractRepository,
      useClass: TransactionRepository,
    },
  ],

  exports: [TransactionAbstractRepository],
})
export class TransactionPersistenceModule {}
