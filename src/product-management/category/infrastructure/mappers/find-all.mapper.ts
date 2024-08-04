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
    const hierarchy = this.setHierarchy(source, allCategories);
    return {
      id: source.id,
      name: source.name,
      status: source.status,
      parentId: source.parentId,
      file: source.file
        ? {
            id: source.file?.id || null,
            originalPath: source.file?.originalPath || null,
            smallPath: source.file?.smallPath || null,
            mediumPath: source.file?.mediumPath || null,
            largePath: source.file?.largePath || null,
          }
        : null,
      hierarchy: hierarchy,
    };
  }

  static setHierarchy(category, allCategories) {
    if (!category.parentId) {
      return category.name;
    }

    const parentCategory = allCategories.find(
      (cat) => cat.id === category.parentId,
    );
    if (parentCategory) {
      const parentHierarchy = this.setHierarchy(parentCategory, allCategories);
      return `${parentHierarchy} > ${category.name}`;
    }

    return category.name;
  }
}
