import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountAbstractRepository } from './repositories/discount.abstract.repository';
import { DiscountRepository } from './repositories/discount.repository';
import { DiscountEntity } from './entites/discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity])],
  providers: [
    {
      provide: DiscountAbstractRepository,
      useClass: DiscountRepository,
    },
  ],
  exports: [DiscountAbstractRepository],
})
export class DiscountPersistenceModule {}
