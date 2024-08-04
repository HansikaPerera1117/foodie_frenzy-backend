import { StoreLocatorFiltersDto } from 'src/store-locator/dto/store-locator-filters.dto';
import { StoreLocatorDto } from 'src/store-locator/dto/store-locator.dto';

export abstract class StoreLocatorAbstractRepository {
  abstract update(storeLocatorId: string, data: StoreLocatorDto);

  abstract delete(storeLocatorId: string);

  abstract create(data: StoreLocatorDto);

  abstract findAll(filters: StoreLocatorFiltersDto);
}
