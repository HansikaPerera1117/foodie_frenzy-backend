export abstract class GalleryAbstractRepository {
  abstract findAll();

  abstract upload(data: any);

  abstract delete(galleryId: string);
}
