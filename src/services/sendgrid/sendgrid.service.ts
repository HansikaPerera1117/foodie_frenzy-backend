import { Injectable } from '@nestjs/common';
import { SendGridCredentials } from './config/send-grid-config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor() {
    sgMail.setApiKey(SendGridCredentials.api_key);
  }

  async sendEmail(message: any) {
    console.log(message, 'mesage');

    try {
      return await sgMail.send(message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
