export class FindAllSubCategoryMapper {
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
    return {
      id: source.id,
      name: source.name,
      status: source.status,
      createdAt: source.createdAt,
      file: source.file
        ? {
            id: source.file?.id || null,
            originalPath: source.file?.originalPath || null,
            smallPath: source.file?.smallPath || null,
            mediumPath: source.file?.mediumPath || null,
            largePath: source.file?.largePath || null,
          }
        : null,
    };
  }
}
