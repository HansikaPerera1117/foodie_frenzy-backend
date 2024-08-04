export class CartMapper {
  static toDomain(cart) {
    // Check if the input is an array
    if (Array.isArray(cart)) {
      // If it's an array, map each item using the map function and return the mapped array
      return cart.map((item) => {
        return this.mapItem(item);
      });
    } else if (cart !== null) {
      // If it's not an array, simply map the single object
      return this.mapItem(cart);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    return {
      id: source.id,
      qty: source.qty,
      productVariant: {
        id: source.productVariant.id,
        sellingPrice: source.productVariant.sellingPrice,
        availableQty: source.productVariant.availableQty,
        ...this.mapTagsAndAttributes(source.productVariant.tag),
      },
      productBaseVariant: {
        id: source.productVariant.productBaseVariant.id,
        name: source.productVariant.productBaseVariant.name,
        baseVariant:
          this.mapTagsAndAttributes(
            source.productVariant.productBaseVariant.tag,
          ) || null,
        productId: source.productVariant.productBaseVariant.product.id,
      },
      file: this.mapVariantFiles(
        source.productVariant.productBaseVariant.variantFile,
      ),
    };
  }

  static mapVariantFiles(files: any) {
    if (!Array.isArray(files)) {
      return [];
    }
    return files.map((variantFile) => {
      const { createdAt, updatedAt, ...rest } = variantFile;
      const { createdAt: fileCreatedAt, id, __entity, ...fileRest } = rest.file;
      return {
        ...fileRest,
      };
    });
  }

  static mapTagsAndAttributes(data) {
    try {
      return {
        attribute: {
          id: data.attribute.id,
          name: data.attribute.name,
          isDefault: data.attribute.isDefault,
          tag: {
            id: data.id,
            name: data.name,
          },
        },
      };
    } catch (error) {
      return null;
    }
  }
}
