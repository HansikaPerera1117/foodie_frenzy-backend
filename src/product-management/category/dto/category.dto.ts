import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsOptional()
  fileId: string;

  @IsString()
  @IsOptional()
  parentId: string;
}
