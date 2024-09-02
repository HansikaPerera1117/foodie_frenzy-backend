import { Test, TestingModule } from '@nestjs/testing';
import { ProductFileService } from './product-file.service';

describe('ProductFileService', () => {
  let service: ProductFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFileService],
    }).compile();

    service = module.get<ProductFileService>(ProductFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
