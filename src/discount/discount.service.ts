import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountAbstractRepository } from './infrastructure/repositories/discount.abstract.repository';

@Injectable()
export class DiscountService {
  constructor(
    private readonly discountRepository: DiscountAbstractRepository,
  ) {}
  create(data: CreateDiscountDto) {
    return this.discountRepository.create(data);
  }

  findAll() {
    return this.discountRepository.findAll();
  }

  delete(discountId: string) {
    return this.discountRepository.delete(discountId);
  }
}
