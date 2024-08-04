import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentTypeEnum } from 'src/common/enum/payment-type.enum';
import { DiliveryDetailsTypeEnum } from 'src/common/enum/delivery-details-type.enum';

class BillingDetailsDto {
  // @IsEnum(DiliveryDetailsTypeEnum)
  // @IsNotEmpty()
  // type: any;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  contactNo: string;

  @IsString()
  @IsOptional()
  dialCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsOptional()
  provice: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;
}

class ShippingDetailsDto extends BillingDetailsDto {}

class ProductVariantDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;
}

export class CreateOrderTransactionDto {
  @IsEnum(PaymentTypeEnum)
  @IsNotEmpty()
  paymentType: PaymentTypeEnum;

  @IsNumber()
  @IsNotEmpty()
  netTotal: number;

  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  discountId?: string;

  @Type(() => BillingDetailsDto)
  @IsNotEmpty()
  billingDetails: BillingDetailsDto;

  @Type(() => ShippingDetailsDto)
  @IsNotEmpty()
  shippingDetails: ShippingDetailsDto;

  @Type(() => ProductVariantDto)
  @IsNotEmpty()
  productVariants: ProductVariantDto[];
}
