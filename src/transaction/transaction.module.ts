import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionPersistenceModule } from './infrastructure/transaction-persistence.module';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [TransactionPersistenceModule],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
