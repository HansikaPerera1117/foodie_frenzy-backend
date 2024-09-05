export class UserMapper {
  static toDomain(user) {
    // Check if the input is an array
    if (Array.isArray(user)) {
      // If it's an array, map each item using the map function and return the mapped array
      return user.map((item) => {
        return this.mapItem(item);
      });
    } else if (user !== null) {
      // If it's not an array, simply map the single object
      return this.mapItem(user);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    return {
      user: {
        id: source.id,
        firstName: source.firstName,
        lastName: source.lastName,
        username: source.username,
        password: source.password,
        email: source.email,
        status: source.status,
        createdAt: source.createdAt,
        staff: source.staff
          ? {
              id: source.staff?.id,
            }
          : undefined,
        customer: source.customer
          ? {
              id: source.customer?.id,
              contactNo: source.customer?.contactNo,
            }
          : undefined,

        role: source.role
          ? {
              id: source.role.id,
              name: source.role.name,
              status: source.role.status,
            }
          : undefined,
      },
    };
  }
}
