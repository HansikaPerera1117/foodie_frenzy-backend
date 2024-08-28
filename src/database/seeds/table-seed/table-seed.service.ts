import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEntity } from 'src/table/infrastructure/entites/table.entity';
import { Repository } from 'typeorm';
import { TableSeedObj } from 'src/common/seed-objects/table.seed-data';

@Injectable()
export class TableSeedService {
  constructor(
    @InjectRepository(TableEntity)
    private repository: Repository<TableEntity>,
  ) {}

  async run() {
    for (const tableData of TableSeedObj) {
      const existingTable = await this.repository.findOne({
        where: { name: tableData.name },
      });

      if (!existingTable) {
        const newTable = this.repository.create({
          name: tableData.name,
          personCount: tableData.personCount,
        });
        await this.repository.save(newTable);
      }
    }
    return true;
  }
}
