import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SeylanMastercardService } from './seylan-mastercard.service';
import { Response, Request } from 'express';
import { TransactionService } from 'src/transaction/transaction.service';
import { UpdatePaymentTransactionResponseDto } from 'src/payment/dto/update-payment-transaction-response.dto';
@Controller('seylan-mastercard')
export class SeylanMastercardController {
  constructor(
    private readonly seylanMastercardService: SeylanMastercardService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post('test')
  test(key) {
    return this.seylanMastercardService.getSessionId('');
  }

  @Post('callback-response')
  async getCallBackResposne(
    @Res() res: Response,
    @Req() req: Request,
    @Body() data: any,
  ) {
    console.log('call back responseeeeeee======================', data);
    const updateData: UpdatePaymentTransactionResponseDto = {
      callBackResponse: data,
      status: data?.result,
    };
    await this.transactionService.updateOnlineTransactionResponseByOrderId(
      data.order.id,
      updateData,
    );
    return res.redirect(
      'https://addressdeeplinks.web.app/landing_page/SUCCESS',
    );
  }
}
