import { CartDto } from 'src/cart/dto/cart.dto';

export abstract class CartAbstractRepository {
  abstract deleteAll(customerId: string);

  abstract delete(cartId: string);

  abstract findCartByCustomerId(customerId: string);

  abstract addToCart(data: CartDto);
}
