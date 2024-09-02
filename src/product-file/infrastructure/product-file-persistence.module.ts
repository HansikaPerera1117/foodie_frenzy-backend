import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFileAbstractRepository } from './repositories/product-file.abstract.repository';
import { ProductFileRepository } from './repositories/product-file.repository';
import { ProductFileEntity } from './entites/product-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductFileEntity])],
  providers: [
    {
      provide: ProductFileAbstractRepository,
      useClass: ProductFileRepository,
    },
  ],
  exports: [ProductFileAbstractRepository],
})
export class ProductFilePersistenceModule {}
