import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { ReviewAbstractRepository } from './infrastructure/repositories/review.abstract.repository';
import { RoleDto } from 'src/role-permission-management/role/dto/role.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewAbstractRepository) {}

  findAll() {
    return this.reviewRepository.findAll();
  }

  async create(data: ReviewDto) {
    // const isPlacedOrder = await this.orderService.findAllByUserId(data.userId);

    // const isAlredyAdded = await this.findByUserIdNProductBaseVariantId(
    //   data.userId,
    //   data.productBaseVariantId,
    // );
    // if (isAlredyAdded) {
    //   throw new HttpException(
    //     'You have already submitted a review. Multiple reviews are not allowed',
    //     HttpStatus.CONFLICT,
    //   );
    // }
    return this.reviewRepository.create(data);
  }

  update(reviewId: string, data: UpdateReviewDto) {
    return this.reviewRepository.update(reviewId, data);
  }
  findByUserIdNProductBaseVariantId(
    userId: string,
    productBaseVariantId: string,
  ) {}

  findAllByProdutBaseVariantId(productBaseVariantId: string) {
    return this.reviewRepository.findAllByProdutBaseVariantId(
      productBaseVariantId,
    );
  }
}
