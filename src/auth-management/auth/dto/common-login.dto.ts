import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';

export class CommonLoginDto {
  @IsOptional()
  @IsString()
  @Transform(lowerCaseTransformer)
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsOptional()
  @IsString()
  // @IsEmail({}, { message: 'Please enter a valid email address' })
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  deviceId: string;

  @IsOptional()
  fcmToken: string;
}
