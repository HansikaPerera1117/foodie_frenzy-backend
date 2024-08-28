import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from './infrastructure/entites/table.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<TableEntity> {
    const table = this.tableRepository.create(createTableDto);
    return await this.tableRepository.save(table);
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    await this.tableRepository.update(id, updateTableDto);
    return await this.tableRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<{ affected: number }> {
    const result = await this.tableRepository.delete(id);
    return { affected: result.affected || 0 };
  }
}
