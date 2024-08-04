import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAbstractRepository } from './repositories/product.abstract.repositories';
import { ProductRepository } from './repositories/product.repository';
import { ProductEntity } from './entites/product.entity';
import { CategoryEntity } from 'src/product-management/category/infrastructure/entites/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,

    ]),
  ],
  providers: [
    {
      provide: ProductAbstractRepository,
      useClass: ProductRepository,
    },
  ],
  exports: [ProductAbstractRepository],
})
export class ProductPersistenceModule {}
