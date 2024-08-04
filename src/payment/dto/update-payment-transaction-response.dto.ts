import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PaymentStatusEnum } from 'src/common/enum/payment-status.enum';

export class UpdatePaymentTransactionResponseDto {
  @IsOptional()
  callBackResponse: any;

  // @IsOptional()
  @IsNotEmpty()
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;

  // @IsEmail()
  // billingEmail: string;
}
