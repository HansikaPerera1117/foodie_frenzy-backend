import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFiltersDto } from './dto/product-filters.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('product/create')
  create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Patch('product/' + 'change-status' + '/:productId')
  changeStatus(
    @Param('productId') productId: string,
    @Query('status') status: number,
  ) {
    return this.productService.changeStatus(productId, status);
  }
  @Get('product/' + 'find-all')
  findAll(
    @Query('status') status: number,
    @Query('name') name: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('perPage') perPage: number,
    @Query('page') page: number,
  ) {
    const filters: ProductFiltersDto = {
      status,
      name,
      minPrice,
      maxPrice,
      perPage,
      page,
    };
    return this.productService.findAll(filters);
  }

  @Put('product/' + 'update/' + ':productId')
  update(@Param('productId') productId: string, @Body() data) {
    return this.productService.update(productId, data);
  }
}
