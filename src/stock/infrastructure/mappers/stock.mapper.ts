export class StockMapper {
  static toDomain(productVariants) {
    if (Array.isArray(productVariants)) {
      return productVariants.map((item) => {
        return this.mapItem(item);
      });
    } else if (productVariants !== null) {
      return this.mapItem(productVariants);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    return {
      id: source.id,
      name: source.name,
      status: source.status,
      category: {
        id: source.product.category.id,
        parent: source.product.category.parent?.name || null,
        children: source.product.category.name,
        categoryHierarchy: source.product.category.parent?.name
          ? source.product.category.parent.name +
            ' > ' +
            source.product.category.name
          : source.product.category.name,
      },
      file: this.mapVariantFiles(source.variantFile),
      priceRange: source.productVariant.priceRange,
      productId: source.product.id,
    };
  }

  static mapVariantFiles(files: any) {
    if (!Array.isArray(files)) {
      return [];
    }
    return files.map((variantFile) => {
      const { createdAt, updatedAt, ...rest } = variantFile;
      const { createdAt: fileCreatedAt, __entity, ...fileRest } = rest.file;
      return {
        ...fileRest,
      };
    });
  }
}
