import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  productBaseVariantId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  // @MaxLength(5)
  count: number;

  @IsString()
  @IsOptional()
  description: string;
}
