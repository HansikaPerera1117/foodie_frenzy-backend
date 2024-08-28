import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableAbstractRepository } from './repositories/table.abstract.repository';
import { TableRepository } from './repositories/table.repository';

@Module({
  providers: [
    {
      provide: TableAbstractRepository,
      useClass: TableRepository,
    },
  ],
  exports: [TableAbstractRepository],
})
export class TablePersistenceModule {}
