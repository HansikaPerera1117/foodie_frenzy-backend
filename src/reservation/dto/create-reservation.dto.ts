import { IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  private email: string;

  @IsNumber()
  private personCount: number;

  @IsString()
  private contactNo: string;

  @IsString()
  private date: string;

  @IsString()
  private time: any;

  @IsString()
  private paymentId: string;

  @IsString()
  userId: string;

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  // Getter and Setter for personCount
  public getPersonCount(): number {
    return this.personCount;
  }

  public setPersonCount(personCount: number): void {
    this.personCount = personCount;
  }

  // Getter and Setter for contactNo
  public getContactNo(): string {
    return this.contactNo;
  }

  public setContactNo(contactNo: string): void {
    this.contactNo = contactNo;
  }

  // Getter and Setter for date
  public getDate(): string {
    return this.date;
  }

  public setDate(date: string): void {
    this.date = date;
  }

  // Getter and Setter for time
  public getTime(): any {
    return this.time;
  }

  public setTime(time: any): void {
    this.time = time;
  }

  // Getter and Setter for paymentId
  public getPaymentId(): string {
    return this.paymentId;
  }

  public setPaymentId(paymentId: string): void {
    this.paymentId = paymentId;
  }
}
