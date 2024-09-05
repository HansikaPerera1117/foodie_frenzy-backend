export abstract class OrderAbstractRepository {
  abstract findById(orderId: string);

  abstract findAll();
}
