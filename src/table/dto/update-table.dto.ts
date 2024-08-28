import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateTableDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  personCount?: number;
}
