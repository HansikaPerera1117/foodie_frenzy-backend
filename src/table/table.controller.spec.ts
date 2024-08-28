import { Test, TestingModule } from '@nestjs/testing';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TableEntity } from './infrastructure/entites/table.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

describe('TableController', () => {
  let controller: TableController;
  let service: TableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableController],
      providers: [
        {
          provide: TableService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TableController>(TableController);
    service = module.get<TableService>(TableService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTable', () => {
    it('should create a table with given data', async () => {
      const createTableDto: CreateTableDto = {
        name: 'Table 1',
        personCount: 4,
      };

      const tableEntity: any = {
        id: 'uuid-1',
        ...createTableDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(tableEntity);

      const result = await controller.createTable(createTableDto);

      expect(result).toEqual(tableEntity);
      expect(service.create).toHaveBeenCalledWith(createTableDto);
    });
  });

  describe('updateTable', () => {
    it('should update a table with given data', async () => {
      const updateTableDto: UpdateTableDto = {
        name: 'Updated Table 1',
        personCount: 6,
      };

      const updatedTableEntity: any = {
        id: 'uuid-1',
        ...updateTableDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTableEntity);

      const result = await controller.updateTable('uuid-1', updateTableDto);

      expect(result).toEqual(updatedTableEntity);
      expect(service.update).toHaveBeenCalledWith('uuid-1', updateTableDto);
    });
  });

  describe('deleteTable', () => {
    it('should delete a table with the given id', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue({ affected: 1 });

      const result = await controller.deleteTable('uuid-1');

      expect(result).toEqual({ affected: 1 });
      expect(service.delete).toHaveBeenCalledWith('uuid-1');
    });
  });
});
