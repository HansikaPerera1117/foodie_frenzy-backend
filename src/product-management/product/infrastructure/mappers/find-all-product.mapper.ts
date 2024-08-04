export class FindAllProductsMapper {
  static toDomain(products) {
    if (Array.isArray(products)) {
      return products.map((item) => {
        return this.mapItem(item);
      });
    } else {
      return null;
    }
  }

  static mapItem(source) {
    const mappedProduct = {
      id: source.id,
      name: source.name,
      status: source.status,
      category: {
        parent: source.category.parent?.name || null,
        children: source.category.name,
        categoryHierarchy: source.category.parent?.name
          ? source.category.parent.name + ' > ' + source.category.name
          : source.category.name,
      },
      file: source.file
        ? {
            originalPath: source.file?.originalPath,
            smallPath: source.file?.smallPath,
            mediumPath: source.file?.mediumPath,
            largePath: source.file?.largePath,
          }
        : null,
    };

    return mappedProduct;
  }
}

//     category: CategoryEntity {
//       id: '36568368-4cbb-4832-b526-357f1459da4a',
//       name: 'Polo',
//       parentId: '61fa410c-b66d-4ef7-9844-a8a45db0873c',
//       status: 1,
//       createdAt: 2024-05-21T09:36:35.413Z,
//       updatedAt: 2024-05-21T09:36:35.413Z,
//       parent: CategoryEntity {
//         id: '61fa410c-b66d-4ef7-9844-a8a45db0873c',
//         name: 'T-Shirt',
//         parentId: null,
//         status: 1,
//         createdAt: 2024-05-21T09:36:35.347Z,
//         updatedAt: 2024-05-21T09:36:35.347Z,
//         __entity: 'CategoryEntity'
//       },
//       __entity: 'CategoryEntity'
//     },
//     file: FileEntity {
//       id: '3d2c35b3-a60f-4939-b351-0dbca053289e',
//       originalName: 'fashion women-small_Small.jpg',
//       originalPath: 'http://localhost:4008/api/files/original/730065efe51b15c5294eb.jpg',
//       smallPath: 'http://localhost:4008/api/files/small/730065efe51b15c5294eb.jpg',
//       mediumPath: 'http://localhost:4008/api/files/medium/730065efe51b15c5294eb.jpg',
//       largePath: 'http://localhost:4008/api/files/large/730065efe51b15c5294eb.jpg',
//       createdAt: 2024-05-22T11:30:28.516Z,
//       updatedAt: 2024-05-22T11:30:28.516Z,
//       deletedAt: null,
//       __entity: 'FileEntity'
//     },
//     __entity: 'ProductEntity'
//   }
