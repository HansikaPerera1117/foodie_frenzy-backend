import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffFiltersDto } from './dto/staff-filters.dto';

@ApiTags('Staff')
@Controller({
  path: 'staff',
})
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /**
   * Find all Admin
   * @returns array of staff
   */
  @Get('find-all')
  async findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('roleId') roleId?: string,
    @Query('status') status?: number,
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ) {
    const filters: StaffFiltersDto = {
      name,
      email,
      roleId,
      status,
      perPage,
      page,
    };
    return this.staffService.findAll(filters);
  }

  @Get('find-one/:staffId')
  async findOne(@Param('staffId') staffId: string) {
    return this.staffService.findOne(staffId);
  }

  /**
   * Create Admin
   * @param data
   */
  @Post('create')
  async create(@Body() data: CreateStaffDto) {
    return this.staffService.create(data);
  }

  @Put('update/:staffId')
  async update(@Param('staffId') staffId: string, @Body() data: any) {
    return this.staffService.update(staffId, data);
  }
}
