import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateReviewDto {
  @IsNumber()
  @IsOptional()
  // @MaxLength(5)
  count: number;

  @IsString()
  @IsOptional()
  description: string;
}
