import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TablePersistenceModule } from './infrastructure/table-persistence.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './infrastructure/entites/table.entity';

@Module({
  imports: [TablePersistenceModule, TypeOrmModule.forFeature([TableEntity])],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
