export abstract class RolePermissionAbstractRepository {
  abstract deleteAllPermissionsByRoleId(role_id: string);

  abstract assigne(roleId, permissionId);

  abstract findAllPermissionsByRoleId(roleId: string);
}
