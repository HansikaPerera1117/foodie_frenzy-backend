import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  productIds: [];
  @IsNumber()
  discountAmount: number;
  @IsNumber()
  netTotal: number;
  @IsNumber()
  subTotal: number;
  @IsNumber()
  paymentType: any;
  @IsNumber()
  shippingFee: number;
}

export class DeliveryDetailDto {
  type: any;
  @IsString()
  fistName: string;
  @IsString()
  lastName: string;
  @IsString()
  contactNo: string;
  @IsString()
  email: string;
  @IsString()
  province: string;
  @IsString()
  city: string;
  @IsString()
  addressLine1: string;
  @IsString()
  addressLine2: string;
}
