import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductPersistenceModule } from './infrastructure/product-persistence.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [ProductPersistenceModule, TransactionModule, ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
