import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  // Dummy data
  const mockProduct = {
    id: '1',
    name: 'Sample Product',
    description: 'A sample product description',
    price: 100,
    fileIds: ['file1', 'file2'],
    categoryId: 'category1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    // Assuming the service.create method will eventually be implemented
    const dto = {
      name: 'Sample Product',
      description: 'A sample product description',
      price: 100,
      fileIds: ['file1', 'file2'],
      categoryId: 'category1',
    };

    // Expectation: service.create should return the created product
    await expect(service.create(dto)).resolves.toEqual(mockProduct);
  });

  it('should find all products', async () => {
    // Expectation: service.findAll should return an array of products
    await expect(service.findAll()).resolves.toEqual([mockProduct]);
  });

  it('should update a product', async () => {
    // Expectation: service.update should return the updated product
    const updateDto = {
      name: 'Updated Product',
      description: 'An updated product description',
      price: 150,
      fileIds: ['file3'],
      categoryId: 'category2',
    };

    await expect(service.update('1', updateDto)).resolves.toEqual(mockProduct);
  });
});
