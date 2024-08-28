import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from '../entites/table.entity';
import { TableAbstractRepository } from './table.abstract.repository';

@Injectable()
export class TableRepository implements TableAbstractRepository {
  // constructor(
  //   @InjectRepository(TableEntity)
  //   private readonly tableRepository: Repository<TableEntity>,
  // ) {}
}
