import { Injectable } from '@nestjs/common';
import { StockAbstractRepository } from './infrastructure/repositories/stock.abstract.repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockAbstractRepository) {}
}
