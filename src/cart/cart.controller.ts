import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() data: CartDto) {
    return this.cartService.addToCart(data);
  }

  @Delete('delete-one/:cartId')
  delete(@Param('cartId') cartId: string) {
    return this.cartService.delete(cartId);
  }
  
  @Delete('delete-all/:customerId')
  deleteAll(@Param('customerId') customerId: string) {
    return this.cartService.deleteAll(customerId);
  }

  @Get('find-by-customerId/:customerId')
  findCartByCustomerId(@Param('customerId') customerId: string) {
    return this.cartService.findCartByCustomerId(customerId);
  }
}
