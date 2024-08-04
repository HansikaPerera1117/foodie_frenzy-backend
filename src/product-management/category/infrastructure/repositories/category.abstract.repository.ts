import { CategoryFiltersDto } from '../../dto/category-filters.dto';
import { CategoryDto } from '../../dto/category.dto';

export abstract class CategoryAbstractRepository {

  abstract adminFindAll(filters: CategoryFiltersDto);

  abstract findAllTrendingNow();

  abstract findByName(name: string);

  abstract findAll();

  abstract findById(categoryId: string);

  abstract findAllSubCategoriesByParentId(parentId: string);

  abstract findAllParentCategories(data: any);

  abstract create(data: CategoryDto);

  abstract update(categoryId: string, data: any);
}
