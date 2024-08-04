import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewPersistenceModule } from './infrastructure/review-persistence.module';

@Module({
  imports: [ReviewPersistenceModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
