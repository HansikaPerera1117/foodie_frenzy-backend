export class PaymentMapper {
  static toDomain(review) {
    // Check if the input is an array
    if (Array.isArray(review)) {
      // If it's an array, map each item using the map function and return the mapped array
      return review.map((item) => {
        return this.mapItem(item);
      });
    } else if (review !== null) {
      // If it's not an array, simply map the single object
      return this.mapItem(review);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    console.log(source);

    return {
      id: source.id,
      count: source.count,
      productId: source.product,
      description: source.description,
      createdAt: source.createdAt,
    };
  }
}
