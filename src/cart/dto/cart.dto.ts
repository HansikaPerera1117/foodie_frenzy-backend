import { IsNumber, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  customerId: string;

  @IsString()
  productVariantId: string;

  @IsNumber()
  qty: number;
}
