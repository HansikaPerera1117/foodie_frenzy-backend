import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InquiriesAbstractRepository } from './repositories/inquiries.abstract.repository';
import { InquiriesRepository } from './repositories/inquiries.repository';
import { InquiriesEntity } from './entites/inquiries.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([InquiriesEntity]), MailModule],

  providers: [
    {
      provide: InquiriesAbstractRepository,
      useClass: InquiriesRepository,
    },
  ],
  exports: [InquiriesAbstractRepository],
})
export class InquiriesPersistenceModule {}
