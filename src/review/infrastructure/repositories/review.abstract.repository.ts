import { ReviewDto } from 'src/review/dto/review.dto';

export abstract class ReviewAbstractRepository {
  abstract findAllByProdutBaseVariantId(productBaseVariantId: string);

  abstract findAll();

  abstract update(reviewId: string, data);

  abstract create(data);

  // abstract changeStatus();
}
