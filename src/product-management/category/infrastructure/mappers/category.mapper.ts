export class CategoryMapper {
  static toDomain(category) {
    if (Array.isArray(category)) {
      return category.map((item) => {
        return this.mapItem(item);
      });
    } else if (category !== null) {
      return this.mapItem(category);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    return {};
  }
}
