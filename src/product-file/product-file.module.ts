import { Module } from '@nestjs/common';
import { ProductFileService } from './product-file.service';
import { ProductFileController } from './product-file.controller';
import { ProductFilePersistenceModule } from './infrastructure/product-file-persistence.module';

@Module({
  imports: [ProductFilePersistenceModule],
  controllers: [ProductFileController],
  providers: [ProductFileService],
})
export class ProductFileModule {}
