import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  private name: string;

  @IsString()
  @IsOptional()
  private description: string;

  @IsString()
  @IsOptional()
  private fileId: string;

  // Getter and Setter for name
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name.trim(); // Ensuring trim is applied in the setter as well
  }

  // Getter and Setter for description
  public getDescription(): string | undefined {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  // Getter and Setter for fileId
  public getFileId(): string | undefined {
    return this.fileId;
  }

  public setFileId(fileId: string): void {
    this.fileId = fileId;
  }
}
