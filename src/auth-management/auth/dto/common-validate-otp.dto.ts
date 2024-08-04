import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CommonValidateOtpDto {
  @IsOptional()
  @Length(2, 15, {
    message: 'Contact number must be between 5 and 15 characters',
  })
  @IsString()
  @IsOptional()
  contactNo: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  dialCode: string;

  @IsString()
  @IsOptional()
  deviceId: string;

  @IsString()
  @IsOptional()
  fcmToken: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
