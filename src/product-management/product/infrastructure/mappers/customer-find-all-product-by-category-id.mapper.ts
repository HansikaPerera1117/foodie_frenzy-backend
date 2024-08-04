export class CustomerFindAllProductsByCategoryIdMapper {
  static toDomain(products) {
    if (Array.isArray(products)) {
      return products.map((item) => {
        return this.mapItem(item);
      });
    } else if (products !== null) {
      // If it's not an array, simply map the single object
      return this.mapItem(products);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    // console.log(source);

    return {
      id: source.id,
      description: source.description,
      manufactureDetails: source.manufactureDetails,
      status: source.status,
      category: {
        id: source.category.id,
        name: source.category.name,
      },
      productBaseVariant: this.mapProductBaseVariants(
        source.productBaseVariant,
      ),
    };
  }

  static mapProductBaseVariants(variants) {
    if (!Array.isArray(variants)) {
      return [];
    }

    return variants.map((variant) => {
      return {
        id: variant.id,
        name: variant.name,
        file: this.mapVariantFiles(variant.variantFile),
        productVariant: this.mapProductVariant(variant.productVariant),
        // tag: variant.tag,
      };
    });
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

  // static mapProductVariant(productVariants) {
  //   if (!Array.isArray(productVariants)) {
  //     return [];
  //   }

  //   return productVariants.map((productVariant) => {
  //     return {
  //       id: productVariant.id,
  //       sellingPrice: productVariant.sellingPrice,
  //       availableQty: productVariant.availableQty,
  //       status: productVariant.status,
  //       // tag: productVariant.tag,
  //     };
  //   });
  // }

  static mapProductVariant(productVariants) {
    if (!Array.isArray(productVariants)) {
      return {};
    }

    if (productVariants.length === 1) {
      return {
        id: productVariants[0].id,
        sellingPrice: productVariants[0].sellingPrice,
        availableQty: productVariants[0].availableQty,
        status: productVariants[0].status,
      };
    } else {
      return productVariants.map((productVariant) => {
        return {
          id: productVariant.id,
          sellingPrice: productVariant.sellingPrice,
          availableQty: productVariant.availableQty,
          status: productVariant.status,
        };
      });
    }
  }
}
