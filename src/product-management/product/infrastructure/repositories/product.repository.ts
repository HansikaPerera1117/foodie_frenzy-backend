import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Connection, ILike, In, Repository } from 'typeorm';
import { ProductAbstractRepository } from './product.abstract.repositories';
import { ProductEntity } from '../entites/product.entity';
import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductFiltersDto } from '../../dto/product-filters.dto';
import { StatusEnum } from 'src/common/enum/status.enum';
import { FindAllProductsMapper } from '../mappers/find-all-product.mapper';
import { ProductFileEntity } from 'src/product-file/infrastructure/entites/product-file.entity';

@Injectable()
export class ProductRepository implements ProductAbstractRepository {
  constructor(
    private readonly connection: Connection,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(filters: ProductFiltersDto) {
    const perPage = filters.perPage || 10;
    const page = filters.page || 1;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productFile', 'productFile')
      .leftJoinAndSelect('productFile.file', 'file');

    if (filters.name) {
      queryBuilder.andWhere('product.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }
    if (filters.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    if (filters.status !== undefined) {
      if (filters.status === 0 || isNaN(filters.status)) {
        queryBuilder.andWhere('product.status IN (:...statuses)', {
          statuses: [StatusEnum.ACTIVE, StatusEnum.INACTIVE],
        });
      } else {
        queryBuilder.andWhere('product.status = :status', {
          status: filters.status,
        });
      }
    }

    const [allProducts, totalCount] = await queryBuilder
      .take(perPage)
      .skip((page - 1) * perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;
    console.log(allProducts);

    return {
      totalCount,
      hasNextPage,
      totalPages,
      currentPage: page,
      data: FindAllProductsMapper.toDomain(allProducts), // Assuming a similar toDomain method for mapping
    };
  }

  async create(data: CreateProductDto) {
    console.log(data);

    return await this.connection.transaction(async (manager) => {
      const createdProduct = await manager.getRepository(ProductEntity).save({
        name: data.name,
        price: data.price,
        description: data.description,
        category: {
          id: data.categoryId,
        },
      });

      for (let file of data.fileIds) {
        await manager.getRepository(ProductFileEntity).save({
          isDefault: file.isDefault,
          file: {
            id: file.id,
          },
          product: {
            id: createdProduct.id,
          },
        });
      }
    });

    //name
    //time datae pers count note email
  }

  async findByName(productName: string) {
    return await this.productRepository.findOne({
      where: {
        name: productName,
      },
    });
  }

  changeStatus(productId: string, status: number) {
    return this.productRepository.update({ id: productId }, { status });
  }

  update(productId: string, data) {
    return this.productRepository.update(
      { id: productId },
      {
        name: data.name,
        description: data.description,
        price: data.price,
        status: data.status,
      },
    );
  }
}
