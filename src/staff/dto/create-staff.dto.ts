import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString({ message: 'First Name  must be a string' })
  firstName: string;

  @IsNotEmpty()
  @IsString({ message: 'First Name  must be a string' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
  // @IsOptional()
  // @IsNotEmpty()
  // @Length(5, 15, {
  //   message: 'Contact number must be between 5 and 15 characters',
  // })
  // @IsString({ message: 'Contact number must be a string' })
  // contactNo: string;
  @IsOptional()
  @IsString()
  fileId: string;

  @IsOptional()
  dialCode: string;

  @IsString()
  contactNo: string;
}
