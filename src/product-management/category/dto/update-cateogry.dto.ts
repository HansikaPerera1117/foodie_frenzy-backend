import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  private name: string;

  @IsString()
  @IsOptional()
  private fileId?: string;

  @IsNumber()
  @IsOptional()
  private status?: number;

  @IsString()
  @IsOptional()
  private description: string;

  // Getter and Setter for name
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name.trim(); // Apply trim in setter to maintain consistency
  }

  // Getter and Setter for fileId
  public getFileId(): string | undefined {
    return this.fileId;
  }

  public setFileId(fileId: string): void {
    this.fileId = fileId;
  }

  // Getter and Setter for status
  public getStatus(): number | undefined {
    return this.status;
  }

  public setStatus(status: number): void {
    this.status = status;
  }

  // Getter and Setter for description
  public getDescription(): string | undefined {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }
}
