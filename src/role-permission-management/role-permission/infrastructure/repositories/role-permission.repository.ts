import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionEntity } from '../entites/role-permission.entity';
import { RolePermissionAbstractRepository } from './role-permission.abstract.repository';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role-permission-management/role/role.service';
import { RoleAbstractRepository } from 'src/role-permission-management/role/infrastructure/repositories/role.abstract.repository';
import { log } from 'util';

export class RolePermissionRepository
  implements RolePermissionAbstractRepository
{
  constructor(
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  async assigne(roleId, permissionId) {
    return await this.rolePermissionRepository.save({
      role: {
        id: roleId,
      },
      permission: {
        id: permissionId,
      },
    });
  }

  async findAllPermissionsByRoleId(roleId: string) {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        role: {
          id: roleId,
        },
      },
      relations: ['permission'],
      // select: {
      //   permission: {
      //     id: true,
      //     code: true,
      //     description: true,
      //   },
      // },
    });
    const permissions = rolePermissions.map(
      (rolePermission) => rolePermission.permission.code,
    );
    return permissions;

    // const permissions = (await rolePermissions).map((rolePermission) => ({
    //   id: rolePermission.permission.id,
    //   code: rolePermission.permission.code,
    //   description: rolePermission.permission.description,
    // }));
  }

  /**
   * @param role_id remove role and permission by role_id
   * @returns return the count of removed
   */
  async deleteAllPermissionsByRoleId(role_id: string) {
    return await this.rolePermissionRepository.delete({
      role: { id: role_id },
    });
  }
}
