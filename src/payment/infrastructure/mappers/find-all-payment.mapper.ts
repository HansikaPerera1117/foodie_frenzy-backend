export class FindAllPaymentMapper {
  static toDomain(payment) {
    // Check if the input is an array
    if (Array.isArray(payment)) {
      // If it's an array, map each item using the map function and return the mapped array
      return payment.map((item) => {
        return this.mapItem(item);
      });
    } else if (payment !== null) {
      // If it's not an array, simply map the single object
      return this.mapItem(payment);
    } else {
      return null;
    }
  }

  static mapItem(source) {
    console.log(source);
    return {
      id: source.id,
      status: source.status,
      createdAt: source.createdAt,
      order: {
        id: source.order.id,
        orderCode: source.order.orderCode,
        status: source.order.status,
        trackingCode: source.order.trackingCode,
        netTotal: source.order.netTotal,
        shippingFee: source.order.shippingFee,
        subTotal: source.order.subTotal,
        discountAmount: source.order.discountAmount,
        createdAt: source.order.createdAt,
      },
    };
  }
}
