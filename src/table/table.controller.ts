import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';


@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  createTable(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Put(':id')
  updateTable(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
  ){
    return this.tableService.update(id, updateTableDto);
  }

  @Delete(':id')
  deleteTable(@Param('id') id: string) {
    return this.tableService.delete(id);
  }
}
