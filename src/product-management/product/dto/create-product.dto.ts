import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  fileId: string;

  @IsString()
  categoryId: string;
}
