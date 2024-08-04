import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductAbstractRepository } from './infrastructure/repositories/product.abstract.repositories';
import { StatusEnum } from 'src/common/enum/status.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFiltersDto } from './dto/product-filters.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductAbstractRepository) {}

  findByName(productName: string) {
    return this.productRepository.findByName(productName);
  }

  async create(data: CreateProductDto) {
    const isExsits = await this.findByName(data.name);
    if (!isExsits) {
      return this.productRepository.create(data);
    } else {
      if (isExsits.status === StatusEnum.ACTIVE) {
        throw new HttpException(
          'You entered product alredy exsits in active list',
          HttpStatus.CONFLICT,
        );
      } else if (isExsits.status === StatusEnum.INACTIVE) {
        throw new HttpException(
          'You entered product alredy in inactive list,please activeate it',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  findAll(filters: ProductFiltersDto) {
    return this.productRepository.findAll(filters);
  }
}
