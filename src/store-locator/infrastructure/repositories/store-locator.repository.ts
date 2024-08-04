import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreLocatorAbstractRepository } from './store-locator.abstract.repository';
import { StoreLocatorDto } from 'src/store-locator/dto/store-locator.dto';
import { StoreLocatorEntity } from '../entites/store-locator.entity';
import { StoreLocatorMapper } from '../mappers/store-locator.mapper';
import { StoreLocatorFiltersDto } from 'src/store-locator/dto/store-locator-filters.dto';

@Injectable()
export class StoreLocatorRepository implements StoreLocatorAbstractRepository {
  constructor(
    @InjectRepository(StoreLocatorEntity)
    private readonly storeLocatorRepository: Repository<StoreLocatorEntity>,
  ) {}

  create(data: StoreLocatorDto) {
    return this.storeLocatorRepository.save({
      title: data.title,
      addressLine: data.addressLine,
      city: data.city,
      country: data.country,
      url: data.url,
      postalCode: data.postalCode,
    });
  }

  async findAll(filters: StoreLocatorFiltersDto) {
    const queryBuilder =
      this.storeLocatorRepository.createQueryBuilder('storeLocator');

    if (filters.postalCode) {
      queryBuilder.andWhere('storeLocator.postalCode = :postalCode', {
        postalCode: filters.postalCode,
      });
    }

    if (filters.city) {
      queryBuilder.andWhere('storeLocator.city ILIKE :city', {
        city: `%${filters.city}%`,
      });
    }

    if (filters.addressLine) {
      queryBuilder.andWhere('storeLocator.addressLine ILIKE :addressLine', {
        addressLine: `%${filters.addressLine}%`,
      });
    }
    // Pagination logic
    const perPage = filters.perPage || 10; // default to 10 items per page if not specified
    const page = filters.page || 1; // default to the first page if not specified

    const [allLocators, totalCount] = await queryBuilder
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;

    return {
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage,
      data: StoreLocatorMapper.toDomain(allLocators),
    };
  }

  delete(storeLocatorId: string) {
    return this.storeLocatorRepository.delete({ id: storeLocatorId });
  }
  update(storeLocatorId: string, data: StoreLocatorDto) {
    return this.storeLocatorRepository.update(
      { id: storeLocatorId },
      {
        title: data.title,
        addressLine: data.addressLine,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        url: data.url,
      },
    );
  }
}
