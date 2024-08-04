import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { RoleFiltersDto } from './dto/role-filters.dto';

@Controller({
  path: 'role',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  create(@Body() data: RoleDto) {
    return this.roleService.create(data);
  }

  @Get('find-all')
  findALl(
    @Query('name') name?: string,
    @Query('status') status?: number,
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ) {
    const filters:RoleFiltersDto = {
      name,
      status,
      perPage,
      page,
    };

    return this.roleService.findAll(filters);
  }

  @Get('find-by-id/:roleId')
  findById(
    @Param('roleId') roleId: string,
    @Query('withPermission') withPermission: boolean,
  ) {
    return this.roleService.findById(roleId, withPermission);
  }

  @Put('update/:roleId')
  update(@Param('roleId') roleId: string, @Body() data: RoleDto) {
    return this.roleService.update(roleId, data);
  }
}
