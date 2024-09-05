import { Injectable } from '@nestjs/common';
import { GalleryAbstractRepository } from './infrastructure/repositories/gallery.abstract.repository';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryAbstractRepository) {}

  upload(data: any) {
    return this.galleryRepository.upload(data);
  }

  findAll() {
    return this.galleryRepository.findAll();
  }

  delete(galleryId: string) {
    return this.galleryRepository.delete(galleryId);
  }
}
