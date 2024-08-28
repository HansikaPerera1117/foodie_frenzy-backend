export class FindAllParentCategoryMapper {
  static toDomain(categories: any, withSubCategories: boolean) {
    if (withSubCategories === true) {
      return this.mapWithSubCategories(categories);
    } else if (withSubCategories === false) {
      return this.mapWithoutSubCategories(categories);
    }
  }

  static mapWithSubCategories(categories: any[]) {
    const categoryMap: Record<string, any> = {};

    categories.forEach((category) => {
      const productFiles: any = [];
      let mapProductFiles = category.product.flatMap((data) => {
        data.productBaseVariant.flatMap((variant) => {
          variant.variantFile.map((vf) => {
            console.log(vf.file);
            const fileInfo = {
              id: vf.file?.id,
              originalName: vf.file?.originalName,
              originalPath: vf.file?.originalPath,
              smallPath: vf.file?.smallPath,
              mediumPath: vf.file?.mediumPath,
              // largePath: vf.file?.largePath,
            };
            productFiles.push(fileInfo);
          });
        });
      });
      console.log(productFiles, '-------------');

      const { id, name, status, parentId, file } = category;
      const mappedFile = file
        ? {
            id: file.id,
            originalPath: file.originalPath,
            mediumPath: file.mediumPath,
            largePath: file.largePath,
            smallPath: file.smallPath,
          }
        : null;
      categoryMap[id] = {
        id,
        name,
        parentId,
        status,
        hierarchy: '',
        file: mappedFile,
        productFiles,
        children: [],
      };
    });

    // Populate children arrays and set hierarchy for each category
    Object.values(categoryMap).forEach((category) => {
      const { parentId, name } = category;
      if (parentId && categoryMap[parentId]) {
        categoryMap[parentId].children.push(category);
        category.hierarchy = `${categoryMap[parentId].hierarchy} > ${name}`;
        categoryMap[parentId].productFiles.push(...category.productFiles);
        category.productFiles = [];
      } else {
        category.hierarchy = name;
      }
    });

    // Collect top-level categories (those without a parentId) into result array
    const result = Object.values(categoryMap).filter(
      (category) => !category.parentId,
    );

    // Set hierarchy for top-level categories' children
    result.forEach((category) => {
      category.children.forEach((child) => {
        child.hierarchy = `${category.hierarchy} > ${child.name}`;
      });
    });

    return result;
  }

  // Map categorys without sub cateogries
  static mapWithoutSubCategories(categories: any[]) {
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      status: category.status,
      file: category.file && {
        id: category.file.id,
        originalPath: category.file.originalPath,
        smallPath: category.file.smallPath,
        mediumPath: category.file.mediumPath,
        largePath: category.file.largePath,
      },
    }));
  }


}
