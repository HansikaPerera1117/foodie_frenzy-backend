import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';

@Controller('inquirie')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post('submit')
  submit(@Body() data) {
    return this.inquiriesService.submit(data);
  }

  @Put('reply/' + ':inquirieId')
  reply(
    @Param('inquirieId') inquirieId: string,
    @Body('message') message: string,
  ) {
    return this.inquiriesService.reply(inquirieId, message);
  }
  @Get('find-all')
  findAll() {
    return this.inquiriesService.findAll();
  }
}
