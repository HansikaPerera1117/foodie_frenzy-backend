import { Injectable } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockAbstractRepository } from './stock.abstract.repository';

@Injectable()
export class StockRepository implements StockAbstractRepository {
  constructor() // @InjectRepository(ProductVariantEntity)
  // private readonly productVariantRepository: Repository<ProductVariantEntity>,
  // @InjectRepository(ProductEntity)
  // private readonly productRepository: Repository<ProductEntity>,
  // @InjectRepository(ProductBaseVariantEntity)
  // private readonly productBaseVariantRepository: Repository<ProductBaseVariantEntity>,
  {}
}
