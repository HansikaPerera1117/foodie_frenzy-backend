import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InquiriesAbstractRepository } from './inquiries.abstract.repository';
import { InquiriesEntity } from '../entites/inquiries.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class InquiriesRepository implements InquiriesAbstractRepository {
  constructor(
    @InjectRepository(InquiriesEntity)
    private readonly inquiriesRepository: Repository<InquiriesEntity>,
    private readonly mailService: MailService,
  ) {}
  findAll() {
    return this.inquiriesRepository.find();
  }
  async reply(inquirieId: string, message: string) {
    await this.inquiriesRepository.update(
      {
        id: inquirieId,
      },
      {
        replyMessage: message,
        status: 'REPLIED',
      },
    );
    const inq = await this.inquiriesRepository.findOne({
      where: {
        id: inquirieId,
      },
    });
    await this.mailService.sendReplyInquire(inq?.email, message);
  }
  submit(data: any) {
    return this.inquiriesRepository.save({
      email: data.email,
      message: data.message,
    });
  }
}
