import { Role } from 'src/role-permission-management/role/domain/role';
import { RoleFiltersDto } from '../../dto/role-filters.dto';

export abstract class RoleAbstractRepository {
  abstract findById(roleId: string, withPermission: boolean);

  abstract findAll(filters: RoleFiltersDto);

  abstract create(
    data: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  );

  // abstract findByName(roleName: string);

  // abstract changeStatus();

  abstract update(roleId: string, data: any);
  abstract findRoleByRoleName(roleName: string);
}
