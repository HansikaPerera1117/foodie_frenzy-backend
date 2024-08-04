import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryAbstractRepository } from './category.abstract.repository';
import { CategoryEntity } from '../entites/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { FindAllParentCategoryMapper } from '../mappers/find-al-parent-categoryl.mapper';
import { FindAllSubCategoryMapper } from '../mappers/find-all-sub-category-by-parent.mapper';
import { CategoryDto } from '../../dto/category.dto';
import { StatusEnum } from 'src/common/enum/status.enum';
import { FindAllMapper } from '../mappers/find-all.mapper';
import { CategoryFiltersDto } from '../../dto/category-filters.dto';
import { UpdateCategoryDto } from '../../dto/update-cateogry.dto';

@Injectable()
export class CategoryRepository implements CategoryAbstractRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  
  ) {}

  /**
   * Find all now trending categories
   * @returns
   */
  async findAllTrendingNow() {
    const categoriesWithoutSubCategories = await this.categoryRepository.find({
      where: {
        parent: {
          id: Not(IsNull()),
        },
        product: {
          id: Not(IsNull()),
        },
      },
      relations: {
        file: true,
      },
      take: 6,
    });
    return FindAllParentCategoryMapper.toDomain(
      categoriesWithoutSubCategories,
      false,
    );
  }

  findByName(name: string) {
    return this.categoryRepository.findOne({
      where: {
        name: name,
        status: StatusEnum.ACTIVE,
      },
    });
  }

  findById(categoryId: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({
      where: {
        status: In([StatusEnum.ACTIVE, StatusEnum.INACTIVE]),
        id: categoryId,
      },
    }) as any;
  }

  async findAll() {
    const allCategories = await this.categoryRepository.find({
      where: {
        status: In([StatusEnum.ACTIVE]),
      },
      relations: {
        file: true,
        parent: true,
      },
      select: {
        parent: {
          id: true,
          name: true,
        },
      },
    });
    // return allCategories;
    return FindAllMapper.toDomain(allCategories);
  }

  async adminFindAll(filters: CategoryFiltersDto) {
    const perPage = filters.perPage || 1000;
    const page = filters.page || 1;

    // Initialize the query builder
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.file', 'file')
      .leftJoinAndSelect('category.parent', 'parent')
      .select(['category', 'file', 'parent.id', 'parent.name']);

    if (filters.name) {
      queryBuilder.andWhere('category.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.status !== undefined) {
      if (filters.status === 0 || isNaN(filters.status)) {
        queryBuilder.andWhere('category.status IN (:...statuses)', {
          statuses: [StatusEnum.ACTIVE, StatusEnum.INACTIVE],
        });
      } else {
        queryBuilder.andWhere('category.status = :status', {
          status: filters.status,
        });
      }
    }
    if (
      filters.parentCategoryId &&
      Number.isInteger(+filters.parentCategoryId)
    ) {
      queryBuilder.andWhere('category.parentId = :parentCategoryId', {
        parentCategoryId: filters.parentCategoryId,
      });
    }

    // Pagination
    const [categories, totalCount] = await queryBuilder
      .take(perPage)
      .skip((page - 1) * perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;

    return {
      totalCount,
      hasNextPage,
      totalPages,
      currentPage: page,
      data: FindAllMapper.toDomain(categories),
    };
  }

  async findAllParentCategories(data: any) {
    if (data.withSubCategories === true) {
      const categoriesWithSubCategories = await this.categoryRepository.find({
        select: {
          parent: {
            id: true,
          },
        },
        relations: {
          file: true,
          product: {
           
          },
        },
      });

      return FindAllParentCategoryMapper.toDomain(
        categoriesWithSubCategories,
        data.withSubCategories,
      );
    } else if (data.withSubCategories == false) {
      const categoriesWithoutSubCategories = await this.categoryRepository.find(
        {
          where: {
            parent: {
              id: IsNull(),
            },
          },
          relations: {
            file: true,
          },
        },
      );
      return FindAllParentCategoryMapper.toDomain(
        categoriesWithoutSubCategories,
        data.withSubCategories,
      );
    }
  }

  /**
   * Find all sub categories by parent id
   * @param parentId find by unique parentId
   * @returns retrun the sub category and related file
   */
  async findAllSubCategoriesByParentId(parentId: string) {
    const subCategories = await this.categoryRepository.find({
      where: {
        parentId: parentId,
      },
      relations: {
        file: true,
      },
    });
    return FindAllSubCategoryMapper.toDomain(subCategories);
  }

  async create(data: CategoryDto) {
    return await this.categoryRepository.save({
      name: data.name,
      file: {
        id: data.fileId,
      },
      parent: {
        id: data?.parentId,
      },
    });
  }

  async update(categoryId: string, data: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.update(
        { id: categoryId },
        {
          name: data.name,
          file: {
            id: data?.fileId,
          },
          status: data.status,
        },
      );
    } catch (error) {
      throw new HttpException(
        `Oops! Unable to update ${data.name} category , please try again later`,
        HttpStatus.NOT_MODIFIED,
      );
    }
  }


}
