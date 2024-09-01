import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryEntity } from './entites/gallery.entity';
import { GalleryAbstractRepository } from './repositories/gallery.abstract.repository';
import { GalleryRepository } from './repositories/gallery.repository';


@Module({
  imports: [TypeOrmModule.forFeature([GalleryEntity])],
  providers: [
    {
      provide: GalleryAbstractRepository,
      useClass: GalleryRepository,
    },
  ],
  exports: [GalleryAbstractRepository],
})
export class GalleryPersistenceModule {}
