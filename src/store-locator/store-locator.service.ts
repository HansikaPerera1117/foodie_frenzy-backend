import { Injectable } from '@nestjs/common';
import { StoreLocatorDto } from './dto/store-locator.dto';
import { StoreLocatorAbstractRepository } from './infrastructure/repositories/store-locator.abstract.repository';
import { StoreLocatorFiltersDto } from './dto/store-locator-filters.dto';

@Injectable()
export class StoreLocatorService {
  constructor(
    private readonly storeLocatorRepository: StoreLocatorAbstractRepository,
  ) {}

  findAll(filters: StoreLocatorFiltersDto) {
    return this.storeLocatorRepository.findAll(filters);
  }
  create(data: StoreLocatorDto) {
    return this.storeLocatorRepository.create(data);
  }

  delete(storeLocatorId: string) {
    return this.storeLocatorRepository.delete(storeLocatorId);
  }

  update(storeLocatorId: string, data: StoreLocatorDto) {
    return this.storeLocatorRepository.update(storeLocatorId, data);
  }
}
