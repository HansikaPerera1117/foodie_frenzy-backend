import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Please input valid role name' })
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  @IsNumber()
  status: number;
}
