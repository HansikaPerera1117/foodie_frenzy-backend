export class StoreLocatorMapper {
  static toDomain(StoreLocator) {
    if (Array.isArray(StoreLocator)) {
      return StoreLocator.map((item) => {
        return this.mapItem(item);
      });
    } else if (StoreLocator !== null) {
      return this.mapItem(StoreLocator);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    return {
      id: source.id,
      title: source.title,
      postalCode:source.postalCode,
      addressLine: source.addressLine,
      city: source.city,
      country: source.country,
      url: source.url,
    };
  }
}
