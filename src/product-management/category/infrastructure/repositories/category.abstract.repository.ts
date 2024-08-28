import { CategoryFiltersDto } from '../../dto/category-filters.dto';
import { CategoryDto } from '../../dto/category.dto';

export abstract class CategoryAbstractRepository {
  abstract adminFindAll(filters: CategoryFiltersDto);

  abstract findAll();

  abstract findByName(name: string);

  abstract findById(categoryId: string);

  abstract create(data: CategoryDto);

  abstract update(categoryId: string, data: any);
}
