import { Injectable } from '@nestjs/common';
import { ReviewAbstractRepository } from './review.abstract.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from '../entites/review.entity';
import { ReviewMapper } from '../mappers/review.mapper';
import { UpdateReviewDto } from 'src/review/dto/update-review.dto';
import { ReviewDto } from 'src/review/dto/review.dto';

@Injectable()
export class ReviewRepository implements ReviewAbstractRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    // @InjectRepository(ProductEntity)
    // private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    // const allReviews = await this.productRepository.find({
    //   relations: {
    //     category: {
    //       parent: true,
    //     },
    //     // file: true,
    //     // review: true,
    //   },
    // });
    // // return allReviews;
    // return AdminFindAllReviewMapper.toDomain(allReviews);
  }
  async findAllByProdutBaseVariantId(productBaseVariantId: string) {
    // const allReviews = await this.reviewRepository.find({
    //   where: {
    //     productBaseVariant: {
    //       id: productBaseVariantId,
    //     },
    //   },
    // });
    // return ReviewMapper.toDomain(allReviews);
  }

  async create(data: ReviewDto) {
    const review = await this.reviewRepository.save({
      count: data.count,
      description: data.description,
      productBaseVariant: {
        id: data.productBaseVariantId,
      },
      user: {
        id: data.userId,
      },
    });
    return ReviewMapper.toDomain(review);
  }

 

  async update(reviewId: string, data: UpdateReviewDto) {
    const update = await this.reviewRepository.update(
      { id: reviewId },
      { count: data.count, description: data.description },
    );
    return update;
    // return ReviewMapper.toDomain(update);
  }
}
