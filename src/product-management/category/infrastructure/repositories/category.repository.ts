import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryAbstractRepository } from './category.abstract.repository';
import { CategoryEntity } from '../entites/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { CategoryDto } from '../../dto/category.dto';
import { StatusEnum } from 'src/common/enum/status.enum';
import { UpdateCategoryDto } from '../../dto/update-cateogry.dto';
import { CategoryFiltersDto } from '../../dto/category-filters.dto';
import { FindAllMapper } from '../mappers/find-all.mapper';

@Injectable()
export class CategoryRepository implements CategoryAbstractRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async adminFindAll(filters: CategoryFiltersDto) {
    const perPage = filters.perPage || 1000;
    const page = filters.page || 1;

    // Initialize the query builder
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.file', 'file')
      .select(['category', 'file']);

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
  findAll() {
    throw new Error('Method not implemented.');
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

  async create(data: CategoryDto) {
    return await this.categoryRepository.save({
      name: data.getName(),
      description: data.getDescription(),
      file: {
        id: data.getFileId(),
      },
    });
  }

  async update(categoryId: string, data: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.update(
        { id: categoryId },
        {
          name: data.getName(),
          file: {
            id: data?.getFileId(),
          },
          status: data.getStatus(),
          description: data.getDescription(),
        },
      );
    } catch (error) {
      throw new HttpException(
        `Oops! Unable to update ${data.getName()} category , please try again later`,
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}
