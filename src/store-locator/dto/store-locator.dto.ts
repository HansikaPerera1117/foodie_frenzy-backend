import { IsString } from 'class-validator';

export class StoreLocatorDto {
  @IsString()
  title: string;

  @IsString()
  addressLine: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  url: string;

  @IsString()
  postalCode: string;
}
