import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  fileIds: any;

  @IsString()
  categoryId: string;
}
