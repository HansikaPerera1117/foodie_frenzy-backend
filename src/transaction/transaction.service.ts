import { Injectable } from '@nestjs/common';
import { TransactionAbstractRepository } from './infrastructure/repositories/transaction.abstract.repository';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

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

  createOnlinePaymentOrderTransaction(data: CreateOrderDto) {
    return this.transactionRepository.createOnlinePaymentOrderTransaction(data);
  }

 
  createCashOnDeliveryOrderTransaction(data: CreateOrderDto) {
   return this.transactionRepository.createCashOnDeliveryOrderTransaction(data)
  }

}
