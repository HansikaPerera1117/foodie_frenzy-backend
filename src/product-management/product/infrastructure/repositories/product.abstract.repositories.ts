import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductFiltersDto } from '../../dto/product-filters.dto';

export abstract class ProductAbstractRepository {
  abstract findAll(filters: ProductFiltersDto);

  abstract create(data: CreateProductDto);

  abstract findByName(productName: string);
}
