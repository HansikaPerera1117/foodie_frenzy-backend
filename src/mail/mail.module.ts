import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendgridModule } from 'src/services/sendgrid/sendgrid.module';

@Module({
  imports: [SendgridModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
