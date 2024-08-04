import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionAbstractRepository } from './transaction.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/staff/infrastructure/entites/staff.entity';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { StaffMapper } from 'src/staff/infrastructure/mappers/staff.mapper';
import { CustomerEntity } from 'src/customer/infrastructure/entites/customer.entity';
import { CustomerMapper } from 'src/customer/infrastructure/mappers/customer.mapper';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';

import { CreateOrderTransactionDto } from 'src/transaction/dto/transaction-create-order.dto';

import { MailService } from 'src/mail/mail.service';
import { EmailActionEnum } from 'src/common/enum/email-action.enum';
import { SeylanMastercardService } from 'src/services/payment-gateways/seylan-mastercard/seylan-mastercard.service';
import { UpdatePaymentTransactionResponseDto } from 'src/payment/dto/update-payment-transaction-response.dto';

@Injectable()
export class TransactionRepository implements TransactionAbstractRepository {
  constructor(
    private readonly connection: Connection,
    private readonly mailService: MailService,
    private readonly seylanMastercardService: SeylanMastercardService,
    // private readonly discountService: DiscountService,
  ) {}

  async createStaff(data: CreateStaffDto) {
    return this.connection.transaction(async (manager) => {
      const createdUser = await manager.getRepository(UserEntity).save({
        username: data.email,
        password: await this.createRandomCode('T-CODE'),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        deviceId: 'device id',
        role: {
          id: data.roleId,
        },
        file: {
          id: data.fileId,
        },
      });

      // const staff = manager.getRepository(StaffEntity).create({ user });

      const createdStaff = await manager.getRepository(StaffEntity).save({
        user: {
          id: createdUser.id,
        },
        contactNo: data.contactNo,
      });

      await this.mailService.sendEmailRoute(
        createdUser,
        EmailActionEnum.USER_CREDENTIALS,
      );

      return StaffMapper.toDomain(createdStaff);
    });
  }

  /**
   * Custome self registeration
   * @param data
   * @returns
   */
  async registerCustomer(data) {
    return this.connection.transaction(async (manager) => {
      const user = await manager.getRepository(UserEntity).save({
        username: data.email,
        // password: await this.hashPassword(data.password),
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        deviceId: data.deviceId,
        fcmToken: data.fcmToken,
        role: data.roleId,
      });
      const customer = await manager.getRepository(CustomerEntity).save({
        contactNo: data.contactNo,
        dialCode: data.dialCode,
        user: user,
      });
      return CustomerMapper.toDomain(customer);
    });
  }

  //Hash Paaswrod
  async hashPassword(password: string) {
    const encryptedPassword = await Buffer.from(password).toString('base64');
    return encryptedPassword;
  }

  async createOnlinePaymentOrderTransaction(data: CreateOrderTransactionDto) {
    // const orderStatus = await this.orderStatusService.findIdByStatusName(
    //   OrderStatusEnum.PENDING,
    // );
    // try {
    //   return await this.connection.transaction(async (manager) => {
    //     const createdOrder = await manager.getRepository(OrderEntity).save({
    //       paymentType: PaymentTypeEnum.ONLINE_PAYMENT,
    //       orderCode: await this.generateOrderCode(),
    //       netTotal: data.netTotal,
    //       shippingFee: 200,
    //       subTotal: data.subTotal,
    //       status: OrderStatusEnum.PENDING,
    //       user: {
    //         id: data.userId,
    //       },
    //       discount: {
    //         id: data?.discountId ? data.discountId : undefined,
    //       },
    //     });
    //     await manager.getRepository(DiliveryDetailEntity).save({
    //       type: DiliveryDetailsTypeEnum.BILLING,
    //       firstName: data.billingDetails.firstName,
    //       lastName: data.billingDetails.lastName,
    //       email: data.billingDetails.email,
    //       contactNo: data.billingDetails.contactNo,
    //       dialCode: data.billingDetails.dialCode,
    //       country: data.billingDetails.country,
    //       state: data.billingDetails.state,
    //       provice: data.billingDetails.provice,
    //       city: data.billingDetails.city,
    //       addressLine1: data.billingDetails.addressLine1,
    //       addressLine2: data.billingDetails.addressLine2,
    //       postalCode: data.billingDetails.postalCode,
    //       order: {
    //         id: createdOrder.id,
    //       },
    //     });
    //     await manager.getRepository(DiliveryDetailEntity).save({
    //       type: DiliveryDetailsTypeEnum.SHIPPING,
    //       firstName: data.shippingDetails.firstName,
    //       lastName: data.shippingDetails.lastName,
    //       email: data.shippingDetails.email,
    //       contactNo: data.shippingDetails.contactNo,
    //       dialCode: data.shippingDetails.dialCode,
    //       country: data.shippingDetails.country,
    //       state: data.shippingDetails.state,
    //       provice: data.shippingDetails.provice,
    //       city: data.shippingDetails.city,
    //       addressLine1: data.shippingDetails.addressLine1,
    //       addressLine2: data.shippingDetails.addressLine2,
    //       postalCode: data.shippingDetails.postalCode,
    //       order: {
    //         id: createdOrder.id,
    //       },
    //     });
    //     await manager.getRepository(PaymentEntity).save({
    //       order: {
    //         id: createdOrder.id,
    //       },
    //       status: PaymentStatusEnum.CANCELLED,
    //     });
    //     //** get session details form the gateway
    //     const gatewaySessionDetails =
    //       await this.seylanMastercardService.getSessionId(createdOrder);
    //     const createdOrderDetails = {
    //       order: createdOrder,
    //       gatewaySessionDetails: gatewaySessionDetails,
    //       billingEmail: data.billingDetails.email,
    //     };
    //     // return createOnlinePayementOrderMapper.toDomain(createdOrderDetails);
    //   });
    // } catch (error) {
    //   console.log(error);
    //   throw new HttpException(
    //     'We encountered an issue while processing your order. Please try again later',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }
  /**
   * Update online transaction response by order id
   * @param data
   * @returns
   */
  async updateOnlineTransactionResponseByOrderId(
    orderId: string,
    data: UpdatePaymentTransactionResponseDto,
  ) {
    // return await this.connection.transaction(async (manager) => {
    //   const orderDetails = await manager.getRepository(OrderEntity).findOne({
    //     where: {
    //       id: orderId,
    //       diliveryDetail: {
    //         type: DiliveryDetailsTypeEnum.BILLING,
    //       },
    //     },
    //     relations: {
    //       orderItem: {
    //         productVariant: true,
    //       },
    //       diliveryDetail: true,
    //     },
    //   });
    //   // update the payemet response and status
    //   const updatePayement = await manager.getRepository(PaymentEntity).update(
    //     {
    //       order: {
    //         id: orderId,
    //       },
    //     },
    //     { callBackResponse: data.callBackResponse, status: data.status },
    //   );
    //   if (data.status === PaymentStatusEnum.SUCCESS) {
    //     for (let oI of orderDetails?.orderItem ?? []) {
    //       const newAvailableQty = oI.productVariant.availableQty - oI.qty;
    //       await manager.getRepository(ProductVariantEntity).update(
    //         {
    //           id: oI.productVariant.id,
    //         },
    //         { availableQty: newAvailableQty },
    //       );
    //       await manager.getRepository(StockEntity).save({
    //         productVariant: {
    //           id: oI.productVariant.id,
    //         },
    //         type: StockTypeEnum.PURCHASE,
    //         qty: -oI.qty,
    //         user: {
    //           id: undefined,
    //         },
    //       });
    //     }
    //     const sendEamilOrderDetails = {
    //       email: orderDetails?.diliveryDetail[0]?.email,
    //       orderCode: orderDetails?.orderCode,
    //     };
    //     await this.mailService.sendEmailRoute(
    //       sendEamilOrderDetails,
    //       EmailActionEnum.ORDER_CONFIRMATION,
    //     );
    //   } else {
    //     console.log('called else');
    //   }
    //   return updatePayement;
    // });
  }

  async generateOrderCode(): Promise<string> {
    let isUnique = false;
    let orderCode = '';

    // while (!isUnique) {
    //   orderCode = this.createRandomCode('ORD-CODE');
    //   const existingOrder = await this.orderRepository.findOne({
    //     where: { orderCode },
    //   });
    //   if (!existingOrder) {
    //     isUnique = true;
    //   }
    // }

    return `ORD-${orderCode}`;
  }

  createRandomCode(type: 'ORD-CODE' | 'T-CODE'): string {
    switch (type) {
      case 'ORD-CODE':
        const randomNum = Math.floor(10000000 + Math.random() * 90000000);
        return `${randomNum}`;
      case 'T-CODE':
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 7; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return result;
      default:
        throw new Error(`Unexpected type: ${type}`);
    }
  }
}
