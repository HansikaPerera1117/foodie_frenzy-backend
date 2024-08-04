import { Injectable } from '@nestjs/common';
import { PermissionAbstractRepository } from './infrastructure/repositories/permission.abstract.repository';

@Injectable()
export class PermissionService {
  constructor(
    private readonly permissionRepository: PermissionAbstractRepository,
  ) {}

  findAll() {
    return this.permissionRepository.findAll();
  }


  findAllPermissionsByRoleId(roleId: string) {}

}
