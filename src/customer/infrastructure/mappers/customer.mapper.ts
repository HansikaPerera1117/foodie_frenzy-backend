export class CustomerMapper {
  static toDomain(user) {
    // Check if the input is an array
    if (Array.isArray(user)) {
      // If it's an array, map each item using the map function and return the mapped array
      return user.map((item) => {
        return this.mapItem(item);
      });
    } else if (user !== null) {
      // If user is not null, map the single object
      return this.mapItem(user);
    } else {
      // If user is null, return null
      return null;
    }
  }

  static mapItem(source) {
    return {
      user: {
        id: source.user.id,
        firstName: source.user.firstName,
        lastName: source.user.lastName,
        username: source.user.username,
        status: source.user.status,
        // password: source.password,
        email: source.user.email,
        deviceId: source.user.deviceId,
        fcmToken: source.user.fcmToken,
        createdAt: source.user.createdAt,
        customer: {
          id: source.id,
          contactNo: source.contactNo,
          dialCode: source.dialCode,
        },
      },
    };
  }
}
