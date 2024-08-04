import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionDto } from './dto/role-permission.dto';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post('assigne')
  assigne(@Body() data: RolePermissionDto) {
    return this.rolePermissionService.assigne(data);
  }

  @Get('find-all/:roleId')
  findAll(@Param('roleId') roleId: string) {
    return this.rolePermissionService.findAllPermissionsByRoleId(roleId);
  }
}
