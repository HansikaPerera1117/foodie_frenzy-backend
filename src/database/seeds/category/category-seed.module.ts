import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/product-management/category/category.service';
import { CategoryEntity } from 'src/product-management/category/infrastructure/entites/category.entity';
import { CategorySeedService } from './category-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategorySeedService],
  exports: [CategorySeedService],
})
export class CategorySeedModule {}
