import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CartAbstractRepository } from './infrastructure/repositories/cart.abstract.repository';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartAbstractRepository) {}
  addToCart(data: CartDto) {
    try {
      return this.cartRepository.addToCart(data);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Oops! unable to add to cart this product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  delete(cartId: string) {
    return this.cartRepository.delete(cartId);
  }

  findCartByCustomerId(customerId: string) {
    return this.cartRepository.findCartByCustomerId(customerId);
  }
  deleteAll(customerId: string) {
    return this.cartRepository.deleteAll(customerId);
  }
}
