import { Injectable } from '@nestjs/common';
import { SendgridService } from 'src/services/sendgrid/sendgrid.service';
import * as path from 'path';
import * as fs from 'fs';
import { EmailActionEnum } from 'src/common/enum/email-action.enum';
import { OrderStatusEnum } from 'src/common/enum/order-status.enum';

@Injectable()
export class MailService {
  constructor(private readonly sendGridService: SendgridService) {}

  async sendEmailRoute(data: any, action: EmailActionEnum) {
    switch (action) {
      case EmailActionEnum.ORDER_CONFIRMATION:
        return this.orderConfirmation(data);

      case EmailActionEnum.USER_CREDENTIALS:
        return this.userCredentials(data);

      case EmailActionEnum.CUSTOMER_VERIFIACTION:
        return this.customerVarification(data);
      default:
        break;
    }
  }
  async userCredentials(data: any) {
    console.log(data, '-------------------');

    const username = data.email;
    const password = data.password;
    const sendUserCredentialPath = path.join(
      __dirname,
      'mail-templates',
      'send-user-credential.hbs',
    );
    const email_template = fs.readFileSync(sendUserCredentialPath, 'utf8');
    const email_content = email_template
      .replace('{{username}}', username)
      .replace('{{password}}', password);

    const message = {
      to: data.email,
      from: process.env.FROM_EMAIL,
      subject: 'Your Login User Credentials',
      html: email_content,
    };

    try {
      return await this.sendGridService.sendEmail(message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  /**
   * Send Order Confimation detaisl
   * @param data
   * @returns
   */
  async orderConfirmation(data) {
    console.log(data);

    const orderCode = data.orderCode;
    const subTotal = data.subTotal;
    const orderConfirmationPath = path.join(
      __dirname,
      'mail-templates',
      'order-confirmation.hbs',
    );
    const email_template = fs.readFileSync(orderConfirmationPath, 'utf8');
    const email_content = email_template
      .replace('{{orderCode}}', orderCode)
      .replace('{{subTotal}}', subTotal);
    const message = {
      to: data.email,
      from: process.env.FROM_EMAIL,
      subject: 'Your Order Confirmation',
      html: email_content,
    };
    try {
      return await this.sendGridService.sendEmail(message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendUserCredential(email: string, username: string, password: string) {
    // const email_template_path =
    //   'src/mail/mail-templates/send-user-credential.hbs';
    // const email_template = fs.readFileSync(email_template_path, 'utf8');
    const email_template_path = path.join(
      __dirname,
      'mail-templates',
      'order-confirmation.hbs',
    );
    const email_template = fs.readFileSync(email_template_path, 'utf8');
    const email_content = email_template
      .replace('{{username}}', username)
      .replace('{{password}}', password);
    const message = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'User Credentials',
      html: email_content,
    };
    try {
      return await this.sendGridService.sendEmail(message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async customerVarification(data: any) {
    const otpMessage = data.message;
    const sendUserCredentialPath = path.join(
      __dirname,
      'mail-templates',
      'customer-verification.hbs',
    );
    const email_template = fs.readFileSync(sendUserCredentialPath, 'utf8');
    const email_content = email_template.replace('{{otpMessage}}', otpMessage);

    const message = {
      to: data.email,
      from: process.env.FROM_EMAIL,
      subject: 'Address Shop Customer Verfication',
      html: email_content,
    };

    try {
      return await this.sendGridService.sendEmail(message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendReservationApproveOrReject(data) {
    const reservationCode = data.reservationCode;
    const reservationDate = data.date;
    const reservationTime = data.time;
    const personCount = data.personCount;
    const email = data.email;
    if (data.status === OrderStatusEnum.ACCEPT) {
      const sendUserCredentialPath = path.join(
        __dirname,
        'mail-templates',
        'reservation.accept.hbs',
      );
      const email_template = fs.readFileSync(sendUserCredentialPath, 'utf8');
      const email_content = email_template
        .replace('{{reservationDate}}', reservationDate)
        .replace('{{reservationCode}}', reservationCode)
        .replace('{{reservationTime}}', reservationTime)
        .replace('{{personCount}}', personCount);

      const message = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: ' Your Reservation Confirmation ',
        html: email_content,
      };

      try {
        return await this.sendGridService.sendEmail(message);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    } else {
      const sendUserCredentialPath = path.join(
        __dirname,
        'mail-templates',
        'reservation.reject.hbs',
      );
      const email_template = fs.readFileSync(sendUserCredentialPath, 'utf8');
      const email_content = email_template
        .replace('{{reservationDate}}', reservationDate)
        .replace('{{reservationCode}}', reservationCode)
        .replace('{{reservationTime}}', reservationTime)
        .replace('{{personCount}}', personCount);

      const message = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: ' Your Reservation Confirmation ',
        html: email_content,
      };

      try {
        return await this.sendGridService.sendEmail(message);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  }
  async sendReplyInquire(email: any, adminMessage: any) {
    const sendUserCredentialPath = path.join(
      __dirname,
      'mail-templates',
      'reply.hbs',
    );
    const email_template = fs.readFileSync(sendUserCredentialPath, 'utf8');
    const email_content = email_template.replace(
      '{{adminMessage}}',
      adminMessage,
    );

    const message = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: ' Your Inquire Reply ',
      html: email_content,
    };

    try {
      return await this.sendGridService.sendEmail(message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
