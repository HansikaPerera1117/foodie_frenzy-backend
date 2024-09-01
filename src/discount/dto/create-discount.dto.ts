import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  private title: string;

  @IsString()
  private description: string;

  @IsNotEmpty()
  private value: number;

  @IsString()
  private startAt: any;

  @IsString()
  private endAt: any;

  @IsString()
  private fileId: string;

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  // Getter and Setter for description
  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  // Getter and Setter for value
  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    this.value = value;
  }

  // Getter and Setter for startAt
  public getStartAt(): any {
    return this.startAt;
  }

  public setStartAt(startAt: any): void {
    this.startAt = startAt;
  }

  // Getter and Setter for endAt
  public getEndAt(): any {
    return this.endAt;
  }

  public setEndAt(endAt: any): void {
    this.endAt = endAt;
  }

  // Getter and Setter for fileId
  public getFileId(): string {
    return this.fileId;
  }

  public setFileId(fileId: string): void {
    this.fileId = fileId;
  }
}
