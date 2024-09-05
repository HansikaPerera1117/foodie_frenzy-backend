import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  orderItems: OrderItemsDto[];

  @IsOptional()
  orderType: string;

  @IsNumber()
  @IsOptional()
  discountAmount: number;

  @IsNumber()
  @IsOptional()
  netTotal: number;

  @IsNumber()
  subTotal: number;

  @IsString()
  paymentType: any;

  @IsOptional()
  shippingFee: number;

  @IsOptional()
  description: string;

  @IsString()
  userId: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  contactNo: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  addressLine: string;
}

// export class DeliveryDetailDto {
//   type: any;

//   @IsString()
//   fistName: string;

//   @IsString()
//   lastName: string;

//   @IsString()
//   contactNo: string;

//   @IsString()
//   email: string;

//   @IsString()
//   city: string;

//   @IsString()
//   addressLine1: string;

//   @IsString()
//   addressLine2: string;
// }

export class OrderItemsDto {
  @IsString()
  id: string;

  @IsNumber()
  qty: number;
}
