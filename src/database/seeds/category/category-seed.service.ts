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
    for (const categoryName in categoryHierarchyObj) {
      if (
        Object.prototype.hasOwnProperty.call(categoryHierarchyObj, categoryName)
      ) {
        const categoryData = categoryHierarchyObj[categoryName];
        let parentCategory = await this.categoryRepository.findOne({
          where: { name: categoryName },
        });

        if (!parentCategory) {
          // Create parent category if it doesn't exist
          parentCategory = this.categoryRepository.create({
            name: categoryName,
          });
          await this.categoryRepository.save(parentCategory);
        }

        if (categoryData.subcategories) {
          for (const subcategoryName of categoryData.subcategories) {
            const existingSubcategory = await this.categoryRepository.findOne({
              where: {
                name: subcategoryName,
                parent: { id: parentCategory.id },
              },
            });

            if (!existingSubcategory) {
              // Create subcategory if it doesn't exist
              const newSubcategory = this.categoryRepository.create({
                name: subcategoryName,
              });
              newSubcategory.parent = parentCategory;
              await this.categoryRepository.save(newSubcategory);
            }
          }
        }
      }
    }
  }
}
