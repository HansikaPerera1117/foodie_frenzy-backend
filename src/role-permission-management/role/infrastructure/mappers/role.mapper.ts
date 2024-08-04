export class RoleMapper {
  static toDomain(role) {
    if (Array.isArray(role)) {
      return role.map((item) => {
        return this.mapItem(item);
      });
    } else if (role !== null) {
      return this.mapItem(role);
    } else {
      return null;
    }
  }

  static mapItem(source: any) {
    return {
      id: source.id,
      name: source.name,
      status: source.status,
      isDefault: source.isDefault,
    };
  }
}
