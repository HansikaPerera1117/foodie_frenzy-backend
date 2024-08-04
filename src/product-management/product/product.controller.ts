import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prefixes } from 'src/utils/prefixes';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFiltersDto } from './dto/product-filters.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(Prefixes.admin + 'product/' + 'create')
  create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  // @Get(Prefixes.admin + 'product/' + 'find-by-name/' + ':name')
  // findByProductByName(@Param('name') name: string) {
  //   return this.productService.findByProductByName(name);
  // }
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
}
