import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-cateogry.dto';
import { CategoryEntity } from './infrastructure/entites/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: any = {
        name: 'Test Category',
        description: 'Test Description',
        fileId: 'test-file-id',
        status: 1,
      };

      const result = await service.create(createCategoryDto);

      expect(result).toEqual({
        id: expect.any(Number),
        ...createCategoryDto,
      });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto: any = {
        name: 'Updated Category',
        description: 'Updated Description',
        fileId: 'updated-file-id',
        status: 1,
      };

      const result = await service.update('1', updateCategoryDto);

      expect(result).toEqual({
        id: 1,
        ...updateCategoryDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = await service.findAll();

      expect(result).toEqual(expect.any(Array));
    });
  });
});
