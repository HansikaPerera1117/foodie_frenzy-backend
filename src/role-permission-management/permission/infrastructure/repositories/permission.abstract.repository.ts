export abstract class PermissionAbstractRepository {
  abstract findAll();

  abstract findOne(permissionId: string);
}
