import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entites/review.entity';
import { ReviewAbstractRepository } from './repositories/review.abstract.repository';
import { ReviewRepository } from './repositories/review.repository';
import { ProductEntity } from 'src/product-management/product/infrastructure/entites/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity,ProductEntity])],
  providers: [
    {
      provide: ReviewAbstractRepository,
      useClass: ReviewRepository,
    },
  ],
  exports: [ReviewAbstractRepository],
})
export class ReviewPersistenceModule {}
