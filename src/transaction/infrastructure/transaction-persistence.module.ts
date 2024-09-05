import { Module } from '@nestjs/common';
import { TransactionAbstractRepository } from './repositories/transaction.abstract.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
 
    ]),
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
