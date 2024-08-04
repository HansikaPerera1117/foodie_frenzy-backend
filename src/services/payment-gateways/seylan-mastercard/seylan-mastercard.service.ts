import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SeylanMasterCardTransactionDetails } from './config/seylan-mastercard.config';

@Injectable()
export class SeylanMastercardService {
  private static seylanMasterCardTransactionDetails = {
    apiOperation: SeylanMasterCardTransactionDetails.apiOperation,
    currency: SeylanMasterCardTransactionDetails.currency,
    description: SeylanMasterCardTransactionDetails.description,
    merchantName: SeylanMasterCardTransactionDetails.merchantName,
    interactionOperation:
      SeylanMasterCardTransactionDetails.interactionOperation,
  };

  constructor(private httpService: HttpService) {}

  async getSessionId(orderDetails: any) {
    console.log(orderDetails);

    const data = {
      apiOperation: SeylanMasterCardTransactionDetails.apiOperation,
      interaction: {
        operation: SeylanMasterCardTransactionDetails.interactionOperation,
        merchant: {
          name: SeylanMasterCardTransactionDetails.merchantName,
        },
      },
      order: {
        currency: 'LKR',
        amount: orderDetails.netTotal,
        id: orderDetails.id,
        description: SeylanMasterCardTransactionDetails.description,
        notificationUrl:
          'https://adress-api.webmotech.com/api/seylan-mastercard/callback-response', //post
      },
    };

    try {
      const sessionResponse = await this.httpService
        .post(
          `https://test-seylan.mtf.gateway.mastercard.com/api/rest/version/81/merchant/TESTSEYLAN66/session`,
          data,
          {
            headers: this.setHeaders(),
          },
        )
        .toPromise();
      return {
        sessionResponse: sessionResponse?.data,
        transactionDetails:
          SeylanMastercardService.seylanMasterCardTransactionDetails,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Oops! Somthing went wrong, Please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  setHeaders() {
    return {
      Authorization:
        'Basic bWVyY2hhbnQuVEVTVFNFWUxBTjY2OjcwOTA1NDY2ZDRiZTUxMjNlNjE5YzE0NmQ2ZjFlMjRi',
      'Accept-Encoding': 'gzip, deflate, br',
    };
  }
}
