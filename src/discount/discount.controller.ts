import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post('create')
  create(@Body() data: CreateDiscountDto) {
    return this.discountService.create(data);
  }
  @Get('find-all')
  findAll() {
    return this.discountService.findAll();
  }

  @Delete('delete/:discountId')
  delete(@Param('discountId') discountId: string) {
    return this.discountService.delete(discountId);
  }
}
