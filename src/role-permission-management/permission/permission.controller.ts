import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller({
  path: 'permission',
})
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('find-all')
  findAll() {
    return this.permissionService.findAll();
  }
}
