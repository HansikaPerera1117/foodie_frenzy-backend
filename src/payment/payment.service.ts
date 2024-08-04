import { Injectable } from '@nestjs/common';
import { PaymentAbstractRepository } from './infrastructure/repositories/payment.abstract.repository';
import { PaymentFiltersDto } from './dto/payment-filters.dto';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentAbstractRepository,
    // private readonly transactionService:TransactionService
  ) {}

  // updateOnlineTransactionResponseByOrderId(
  //   orderId: string,
  //   data,
  // ) {
  //   return this.transactionService.updateOnlineTransactionResponseByOrderId(
  //     orderId,
  //     data,
  //   );
  // }

  findAll(filters: PaymentFiltersDto) {
    return this.paymentRepository.findAll(filters);
  }
}
