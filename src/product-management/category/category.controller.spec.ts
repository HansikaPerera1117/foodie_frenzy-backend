import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './infrastructure/entites/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a category with given data', async () => {
      const categoryDto: CategoryDto = new CategoryDto();
      categoryDto.setName('Test Category');
      categoryDto.setDescription('Test Description');
      categoryDto.setFileId('test-file-id');

      jest.spyOn(service, 'create').mockResolvedValue({
        id: 1,
        name: 'Test Category',
        description: 'Test Description',
        fileId: 'test-file-id',
      });

      const result = await controller.create(categoryDto);

      expect(result).toEqual({
        id: 1,
        name: 'Test Category',
        description: 'Test Description',
        fileId: 'test-file-id',
      });

      expect(service.create).toHaveBeenCalledWith(categoryDto);
    });
  });

  describe('updateCategory', () => {
    it('should update a category with given data', async () => {
      const categoryDto: any = new CategoryDto();
      categoryDto.setName('Updated Category');
      categoryDto.setDescription('Updated Description');
      categoryDto.setFileId('updated-file-id');

      jest.spyOn(service, 'update').mockResolvedValue({
        id: 1,
        name: 'Updated Category',
        description: 'Updated Description',
        fileId: 'updated-file-id',
      });

      const result = await controller.update('1', categoryDto);

      expect(result).toEqual({
        id: 1,
        name: 'Updated Category',
        description: 'Updated Description',
        fileId: 'updated-file-id',
      });

      expect(service.update).toHaveBeenCalledWith(1, categoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories: any[] = [
        {
          id: 1,
          name: 'Category 1',
          description: 'Description 1',
          fileId: 'file-id-1',
        },
        {
          id: 2,
          name: 'Category 2',
          description: 'Description 2',
          fileId: 'file-id-2',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      // const result = await controller.findAll();

      // expect(result).toEqual(categories);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
