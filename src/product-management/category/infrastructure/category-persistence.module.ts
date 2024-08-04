import { Module } from '@nestjs/common';
import { CategoryAbstractRepository } from './repositories/category.abstract.repository';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryEntity } from './entites/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity,]),],
  providers: [
    {
      provide: CategoryAbstractRepository,
      useClass: CategoryRepository,
    },

  ],
  exports: [CategoryAbstractRepository],
})
export class CategoryPersistenceModule {}
