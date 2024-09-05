import { Module } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { InquiriesController } from './inquiries.controller';
import { InquiriesPersistenceModule } from './infrastructure/inquiries-persistence.module';

@Module({
  imports: [InquiriesPersistenceModule],
  controllers: [InquiriesController],
  providers: [InquiriesService],
})
export class InquiriesModule {}
