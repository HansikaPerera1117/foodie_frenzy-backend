import { Test, TestingModule } from '@nestjs/testing';
import { ProductFileController } from './product-file.controller';
import { ProductFileService } from './product-file.service';

describe('ProductFileController', () => {
  let controller: ProductFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductFileController],
      providers: [ProductFileService],
    }).compile();

    controller = module.get<ProductFileController>(ProductFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
