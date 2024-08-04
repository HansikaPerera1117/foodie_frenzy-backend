import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('find-all-by-productId/:prodcutId')
  findReviewsByProcutIdNUserId(
    @Param('prodcutId') prodcutId: string,
    @Query('userId') userId: string,
  ) {
    //  return this.reviewService.findReviewsByProcutIdNUserId()
  }

  @Get('find-all')
  findAll() {
    return this.reviewService.findAll();
  }
  /**
   * Create a new Review by customer. this is allow only to item orderd customer
   * @param data
   * @returns
   */
  @Post('create')
  create(@Body() data: ReviewDto) {
    return this.reviewService.create(data);
  }

  /**
   * Find all reviews by productBaseVariantId.
   * @param productBaseVariantId
   * @returns
   */
  @Get('find-all-by-productBaseVariantId/:productBaseVariantId')
  findAllByProdutBaseVariantId(
    @Param('productBaseVariantId') productBaseVariantId: string,
  ) {
    return this.reviewService.findAllByProdutBaseVariantId(
      productBaseVariantId,
    );
  }

  @Put('update/:reviewId')
  update(@Param('reviewId') reviewId: string, @Body() data: UpdateReviewDto) {
    return this.reviewService.update(reviewId, data);
  }

  // @Patch('delete/:reviewId')
}
