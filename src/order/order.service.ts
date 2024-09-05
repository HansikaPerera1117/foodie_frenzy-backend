import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { PaymentTypeEnum } from 'src/common/enum/payment-type.enum';
import { OrderAbstractRepository } from './infrastructure/repositories/order.abstract.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly orderRepository: OrderAbstractRepository,
  ) {}

  create(data: CreateOrderDto) {
    if (data.paymentType == PaymentTypeEnum.CASH_ON_DELIVERY) {
      return this.transactionService.createCashOnDeliveryOrderTransaction(data);
    } else if (data.paymentType === PaymentTypeEnum.ONLINE_PAYMENT) {
      return this.transactionService.createOnlinePaymentOrderTransaction(data);
    }
  }

  findAll() {
    return this.orderRepository.findAll();
  }

  findById(orderId: string) {
    return this.orderRepository.findById(orderId);
  }
}
