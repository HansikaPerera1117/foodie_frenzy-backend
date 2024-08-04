import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolePermissionDto } from './dto/role-permission.dto';
import { RolePermissionAbstractRepository } from './infrastructure/repositories/role-permission.abstract.repository';

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly rolePermissionService: RolePermissionAbstractRepository,
  ) {}
  async assigne(data: RolePermissionDto) {
    const isDeleted = await this.deleteAllPermissionsByRoleId(data.roleId);
    if (isDeleted) {
      const rolePermissions: any = [];
      try {
        for (let permissionId of data.permissionIds) {
          const createdRolePermissions =
            await this.rolePermissionService.assigne(data.roleId, permissionId);
          rolePermissions.push(createdRolePermissions);
        }
      } catch (error) {
        throw new HttpException(
          'somthing went wrong in the porcess',
          HttpStatus.BAD_REQUEST,
        );
      }
      return { roleId: data.roleId, rolePermissions };
    }
  }

  async findAllPermissionsByRoleId(roleId: string) {
    return await this.rolePermissionService.findAllPermissionsByRoleId(roleId);
  } /**
   * @param data remove role and permission by role_id
   * @returns return the count of removed
   */

  async deleteAllPermissionsByRoleId(role_id: any) {
    try {
      return await this.rolePermissionService.deleteAllPermissionsByRoleId(
        role_id,
      );
    } catch (error) {
      throw new HttpException(
        'Unable to remove  permission,Please try again later',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}
