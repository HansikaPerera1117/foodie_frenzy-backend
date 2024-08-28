import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/product-management/category/infrastructure/entites/category.entity';
import { Repository } from 'typeorm';
import categoryHierarchyObj from 'src/common/seed-objects/category.seed-data';
@Injectable()
export class CategorySeedService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async run() {
    await this.create();
  }

  async create() {
    for (let cn of categoryHierarchyObj) {
      const isExsits = await this.categoryRepository.findOne({
        where: {
          name: cn,
        },
      });
      if (!isExsits) {
        await this.categoryRepository.save({
          name: cn,
        });
      }
    }
  }
}
