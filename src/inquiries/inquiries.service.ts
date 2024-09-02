import { Injectable } from '@nestjs/common';
import { InquiriesAbstractRepository } from './infrastructure/repositories/inquiries.abstract.repository';

@Injectable()
export class InquiriesService {
  constructor(
    private readonly inquiresRepository: InquiriesAbstractRepository,
  ) {}
  submit(data: any) {
    return this.inquiresRepository.submit(data);
  }
  reply(inquirieId: string, message: string) {
    return this.inquiresRepository.reply(inquirieId, message);
  }

  findAll() {
    return this, this.inquiresRepository.findAll();
  }
}
