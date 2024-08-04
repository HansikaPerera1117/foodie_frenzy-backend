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

  /**
   * Find all categories with or witout sub categories
   * @param withSubCategories set boolenn
   * @returns with the files of the cateogries
   */
  @Get('category/' + 'find-all-parent-categories')
  findAllParentCategories(
    @Query('withSubCategories') withSubCategories: boolean,
    @Query('withProductFiles') withProductFiles?: boolean,
  ) {
    const data = {
      withSubCategories: withSubCategories,
      withProductFiles: withProductFiles,
    };
    return this.categoryService.findAllParentCategories(data);
  }

  @Get('category/' + 'find-all')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(Prefixes.admin + 'category/' + 'find-all')
  adminFindAll(
    @Query('name') name?: string,
    @Query('parentCategoryId') parentCategoryId?: string,
    @Query('status') status?: number,
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ) {
    const filters: CategoryFiltersDto = {
      name,
      parentCategoryId,
      status,
      perPage,
      page,
    };
    return this.categoryService.adminFindAll(filters);
  }

  @Get('category/' + 'find-all-sub-categories-by-parentId/:parentId')
  findAllSubCategoriesByParentId(@Param('parentId') parentId: string) {
    return this.categoryService.findAllSubCategoriesByParentId(parentId);
  }

  @Post('category/' + 'create')
  create(@Body() data: CategoryDto) {
    return this.categoryService.create(data);
  }
  @Put('category/' + 'update/:categoryId')
  update(@Param('categoryId') categoryId: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(categoryId, data);
  }

  @Get('category/' + 'find-all-trending-now')
  findAllTrendingNow() {
    return this.categoryService.findAllTrendingNow();
  }

  @Patch('category/' + 'change-status/:categoryId')
  changeStatus(
    @Param('categoryId') categoryId: string,
    @Query('status') status: number,
  ) {
    return this.categoryService.changeStatus(categoryId, status);
  }
}
