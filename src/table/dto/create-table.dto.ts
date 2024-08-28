import { IsString, IsInt, Min } from 'class-validator';

export class CreateTableDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1) // Assuming at least 1 person should be allowed at a table
  personCount: number;
}
