import { UpdatePaymentTransactionResponseDto } from 'src/payment/dto/update-payment-transaction-response.dto';
import { CreateOrderTransactionDto } from 'src/transaction/dto/transaction-create-order.dto';

export abstract class TransactionAbstractRepository {
  abstract updateOnlineTransactionResponseByOrderId(
    orderId: string,
    data: UpdatePaymentTransactionResponseDto,
  );

  abstract createOnlinePaymentOrderTransaction(data: CreateOrderTransactionDto);


  abstract createStaff(data: any);

  abstract registerCustomer(data);



}
