import { CreateOrderDto } from 'src/order/dto/create-order.dto';

export abstract class TransactionAbstractRepository {
 

  abstract createOnlinePaymentOrderTransaction(data: CreateOrderDto);

  abstract createStaff(data: any);

  abstract registerCustomer(data);

  abstract createCashOnDeliveryOrderTransaction(data: CreateOrderDto);
}
