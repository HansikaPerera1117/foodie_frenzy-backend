import { Module } from '@nestjs/common';
import { TableSeedService } from './table-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from 'src/table/infrastructure/entites/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  providers: [TableSeedService],
  exports: [TableSeedService],
})
export class TableSeedModule {}
