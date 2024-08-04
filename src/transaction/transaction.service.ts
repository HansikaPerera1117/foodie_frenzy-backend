import { Injectable } from '@nestjs/common';
import { TransactionAbstractRepository } from './infrastructure/repositories/transaction.abstract.repository';
import { CreateOrderTransactionDto } from './dto/transaction-create-order.dto';
import { UpdatePaymentTransactionResponseDto } from 'src/payment/dto/update-payment-transaction-response.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionAbstractRepository,
  ) {}

  /**
   * Transaction create staff account
   */

  async createStaff(data: any) {
    return await this.transactionRepository.createStaff(data);
  }

  async registerCustomer(data) {
    return await this.transactionRepository.registerCustomer(data);
  }

  createOnlinePaymentOrderTransaction(data: CreateOrderTransactionDto) {
    return this.transactionRepository.createOnlinePaymentOrderTransaction(data);
  }

  updateOnlineTransactionResponseByOrderId(
    orderId: string,
    data: UpdatePaymentTransactionResponseDto,
  ) {
    return this.transactionRepository.updateOnlineTransactionResponseByOrderId(
      orderId,
      data,
    );
  }
}
