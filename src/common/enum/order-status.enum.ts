export enum OrderStatusEnum {
  PENDING = 'PENDING', // First status when order submitted
  PROCESSING = 'PROCESSING', // start to pack your order
  SHIPPED = 'SHIPPED', // order has been shipped, on the way
  DELIVERED = 'DELIVERED', // order deliverd to customer and resived by customer
  CANCELLED = 'CANCELLED', //order has benn cancelld by customer
  REJECTED = 'REJECTED', // order has been rejected by admin
}
