export class AdminFindAllReviewMapper {
  static toDomain(review) {
    // console.log(review);

    // Check if the input is an array
    if (Array.isArray(review)) {
      // If it's an array, map each item using the map function and return the mapped array
      return review.map((item) => {
        return this.mapItem(item);
      });
      // } else if (review !== null) {
      //   // If it's not an array, simply map the single object
      //   return this.mapItem(review);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    return {
      id: source.id,
      count: source.name,
      originalPath: source.file.originalPath,
      smallPath: source.file.smallPath,
      mediumPath: source.file.mediumPath,
      largePath: source.file.largePath,
      categoryPath:
        source.category.parent?.name + ' > ' + source.category?.name,
      review: source.review?.map((reviewEntity) => ({
        id: reviewEntity.id,
        count: reviewEntity.count,
        description: reviewEntity.description,
        createdAt: reviewEntity.createdAt,
      })),
    };
  }
}
