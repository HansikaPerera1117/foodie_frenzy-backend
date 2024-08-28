import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoryAbstractRepository } from './infrastructure/repositories/category.abstract.repository';
import { CategoryFiltersDto } from './dto/category-filters.dto';
import { UpdateCategoryDto } from './dto/update-cateogry.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryAbstractRepository,
  ) {}

  findAll() {
    return this.categoryRepository.findAll();
  }

  adminFindAll(filters: CategoryFiltersDto) {
    return this.categoryRepository.adminFindAll(filters);
  }

  findById(categoryId: string) {
    return this.categoryRepository.findById(categoryId);
  }

  findByName(name: string) {
    return this.categoryRepository.findByName(name);
  }

  async create(data: CategoryDto) {
    return await this.categoryRepository.create(data);
  }

  async update(categoryId: string, data: UpdateCategoryDto) {
    const isExsits = await this.findById(categoryId);
    if (isExsits) {
      return this.categoryRepository.update(categoryId, data);
    }
    throw new HttpException('category not found', HttpStatus.NOT_FOUND);
  }

  changeStatus(categoryId: string, status: number) {}
}
