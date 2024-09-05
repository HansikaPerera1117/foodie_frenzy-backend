import { Controller } from '@nestjs/common';
import { ProductFileService } from './product-file.service';

@Controller('product-file')
export class ProductFileController {
  constructor(private readonly productFileService: ProductFileService) {}
}
