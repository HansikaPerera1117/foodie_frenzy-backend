export class StaffMapper {
  static toDomain(staff) {
    // Check if the input is an array
    if (Array.isArray(staff)) {
      // If it's an array, map each item using the map function and return the mapped array
      return staff.map((item) => {
        return this.mapItem(item);
      });
    } else if (staff !== null) {
      // If it's not an array, simply map the single object
      return this.mapItem(staff);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    return {
      user: {
        id: source.user.id,
        firstName: source.user.firstName,
        lastName: source.user.lastName,
        status: source.user.status,
        email: source.user.email,
        // password: source.user.password,
        contactNo: source.user.contactNo,
        staff: {
          id: source.id,
          contactNo: source.contactNo,
        },
        role: source.user.role
          ? {
              id: source.user.role.id,
              name: source.user.role.name,
              status: source.user.role.status,
            }
          : undefined,
        file: source.user.file
          ? {
              id: source.user.file.id,
              originalName: source.user.file.originalName,
              originalPath: source.user.file.originalPath,
              smallPath: source.user.file.smallPath,
              mediumPath: source.user.file.mediumPath,
              largePath: source.user.file.largePath,
            }
          : null,
      },
    };
  }
}
