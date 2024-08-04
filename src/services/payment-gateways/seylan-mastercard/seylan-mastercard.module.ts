import { Module, forwardRef } from '@nestjs/common';
import { SeylanMastercardService } from './seylan-mastercard.service';
import { SeylanMastercardController } from './seylan-mastercard.controller';
import { HttpModule } from '@nestjs/axios';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [HttpModule, forwardRef(() => TransactionModule)],
  controllers: [SeylanMastercardController],
  providers: [SeylanMastercardService],
  exports: [SeylanMastercardService],
})
export class SeylanMastercardModule {}
