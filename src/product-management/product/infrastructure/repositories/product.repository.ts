import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { ProductAbstractRepository } from './product.abstract.repositories';
import { ProductEntity } from '../entites/product.entity';
import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductFiltersDto } from '../../dto/product-filters.dto';

@Injectable()
export class ProductRepository implements ProductAbstractRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  findAll(filters: ProductFiltersDto) {

  }

  create(data: CreateProductDto) {
    return this.productRepository.save({
      name: data.name,
      price: data.price,
      description: data.description,
      // category:{

      // }
    });
  }

  async findByName(productName: string) {
    return await this.productRepository.findOne({
      where: {
        name: productName,
      },
    });
  }
}
