import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'First Name  must be a string' })
  firstName: string;

  @IsNotEmpty()
  @IsString({ message: 'First Name  must be a string' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(5, 15, {
    message: 'Contact number must be between 5 and 15 characters',
  })
  @IsString({ message: 'Contact number must be a string' })
  contactNo: string;

  @IsOptional()
  countryCode: string;

  @IsOptional()
  dialCode: string;

  @IsOptional()
  deviceId: string;

  @IsOptional()
  fcmToken: string;
}
