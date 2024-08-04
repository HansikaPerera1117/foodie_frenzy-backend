import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StoreLocatorService } from './store-locator.service';
import { StoreLocatorDto } from './dto/store-locator.dto';
import { StoreLocatorFiltersDto } from './dto/store-locator-filters.dto';

@Controller('store-locator')
export class StoreLocatorController {
  constructor(private readonly storeLocatorService: StoreLocatorService) {}

  @Get('find-all')
  findAll(
    @Query('postalCode') postalCode?: string,
    @Query('city') city?: string,
    @Query('addressLine') addressLine?: string,
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ) {
    const filters: StoreLocatorFiltersDto = {
      postalCode,
      city,
      addressLine,
      perPage,
      page,
    };
    return this.storeLocatorService.findAll(filters);
  }

  @Post('create')
  create(@Body() data: StoreLocatorDto) {
    return this.storeLocatorService.create(data);
  }

  @Delete('delete/:storeLocatorId')
  delete(@Param('storeLocatorId') storeLocatorId: string) {
    return this.storeLocatorService.delete(storeLocatorId);
  }

  @Put('update/:storeLocatorId')
  update(
    @Param('storeLocatorId') storeLocatorId: string,
    @Body() data: StoreLocatorDto,
  ) {
    return this.storeLocatorService.update(storeLocatorId, data);
  }
}
