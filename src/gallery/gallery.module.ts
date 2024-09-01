import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryPersistenceModule } from './infrastructure/gallery-persistence.module';

@Module({
  imports: [GalleryPersistenceModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
