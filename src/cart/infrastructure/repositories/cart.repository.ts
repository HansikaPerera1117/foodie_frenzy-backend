import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartAbstractRepository } from './cart.abstract.repository';
import { CartEntity } from '../entites/cart.entity';
import { CartDto } from 'src/cart/dto/cart.dto';
import { CartMapper } from '../mappers/cart.mapper';

@Injectable()
export class CartRepository implements CartAbstractRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async delete(cartId: string) {
    try {
      return this.cartRepository.delete({ id: cartId });
    } catch (error) {
      throw new HttpException(
        'Unable to remove from the cart',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addToCart(data: CartDto) {
    const isExsits = await this.findByCustomerIdNproductVariantId(
      data.customerId,
      data.productVariantId,
    );
    try {
      console.log(isExsits, '==========');

      if (!isExsits) {
        return await this.cartRepository.save({
          productVariant: {
            id: data.productVariantId,
          },
          customer: {
            id: data.customerId,
          },
          qty: data.qty,
        });
      } else if (isExsits) {
        return await this.cartRepository.update(
          { id: isExsits.id },
          { qty: data.qty },
        );
      }
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Oops! unable to update your cart,please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
    // try {
    // } catch (error) {

    // }
  }

  async findCartByCustomerId(customerId: string) {
    const customerCart = await this.cartRepository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
      relations: {

      },
    });
    return CartMapper.toDomain(customerCart);
  }

  findByCustomerIdNproductVariantId(
    customerId: string,
    productVariantId: string,
  ) {
    return this.cartRepository.findOne({
      where: {
        customer: {
          id: customerId,
        },
    
      },
    });
  }

  deleteAll(customerId: string) {
    return this.cartRepository.delete({
      customer: {
        id: customerId,
      },
    });
  }
}
