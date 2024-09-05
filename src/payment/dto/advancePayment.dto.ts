import { IsNumber, IsOptional } from 'class-validator';

export class AdvancePaymentDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  cardDetails: any;
}
