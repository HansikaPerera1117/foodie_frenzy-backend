import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Prefixes } from 'src/utils/prefixes';
import { PaymentFiltersDto } from './dto/payment-filters.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Put(Prefixes.customer + 'payment/' + 'update/transaction-response/:orderId')
  // updateOnlineTransactionResponseByOrderId(
  //   @Param('orderId') orderId: string,
  //   @Body() data,
  // ) {

  //   // return this.paymentService.updateOnlineTransactionResponseByOrderId(
  //   //   orderId,
  //   //   data,
  //   // );
  // }

  @Get(Prefixes.admin + 'payment/' + 'find-all')
  findAll(
    @Query('orderCode') orderCode?: string,
    @Query('customerName') customerName?: string,
    @Query('orderStatus') orderStatus?: number,
    @Query('paymnetStatus') paymnetStatus?: number,
    @Query('paymentStartDate') paymentStartDate?: string,
    @Query('paymentEndDate') paymentEndDate?: string,
    @Query('trackingCode') trackingCode?: string,
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ) {
    const filters: PaymentFiltersDto = {
      orderCode,
      customerName,
      orderStatus,
      paymentStartDate,
      paymentEndDate,
      paymnetStatus,
      trackingCode,
      page,
      perPage,
    };
    return this.paymentService.findAll(filters);
  }
}
