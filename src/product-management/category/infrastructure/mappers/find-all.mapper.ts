export class FindAllMapper {
  static toDomain(category) {
    if (Array.isArray(category)) {
      return category.map((item) => {
        return this.mapItem(item, category);
      });
    } else if (category !== null) {
      return this.mapItem(category, [category]);
    } else {
      return null;
    }
  }

  static mapItem(source, allCategories) {
    return {
      id: source.id,
      name: source.name,
      status: source.status,
      description: source?.description,
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
