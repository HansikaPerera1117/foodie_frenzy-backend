import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryFiltersDto } from './dto/category-filters.dto';
import { Prefixes } from 'src/utils/prefixes';
import { UpdateCategoryDto } from './dto/update-cateogry.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

 
  @Get(Prefixes.admin + 'category/' + 'find-all')
  adminFindAll(
    @Query('name') name?: string,
    @Query('status') status?: number,
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ) {
    const filters: CategoryFiltersDto = {
      name,
      status,
      perPage,
      page,
    };
    return this.categoryService.adminFindAll(filters);
  }

  @Post('category/' + 'create')
  create(@Body() data: CategoryDto) {
    return this.categoryService.create(data);
  }



  @Put('category/' + 'update/:categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, data);
  }

  @Patch('category/' + 'change-status/:categoryId')
  changeStatus(
    @Param('categoryId') categoryId: string,
    @Query('status') status: number,
  ) {
    return this.categoryService.changeStatus(categoryId, status);
  }
}
