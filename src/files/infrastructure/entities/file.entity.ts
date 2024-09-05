import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import appConfig from '../../../config/app.config';
import { AppConfig } from 'src/config/app-config.type';
import { CategoryEntity } from 'src/product-management/category/infrastructure/entites/category.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { ProductFileEntity } from 'src/product-file/infrastructure/entites/product-file.entity';
import { DiscountEntity } from 'src/discount/infrastructure/entites/discount.entity';
import { GalleryEntity } from 'src/gallery/infrastructure/entites/gallery.entity';

@Entity({ name: 'file' })
export class FileEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  originalPath: string;

  @Column()
  smallPath: string;

  @Column()
  mediumPath: string;

  @Column()
  largePath: string;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.originalPath.indexOf('/') === 0) {
      this.originalPath =
        (appConfig() as AppConfig).backendDomain + this.originalPath;
    }
    if (this.smallPath.indexOf('/') === 0) {
      this.smallPath =
        (appConfig() as AppConfig).backendDomain + this.smallPath;
    }
    if (this.mediumPath.indexOf('/') === 0) {
      this.mediumPath =
        (appConfig() as AppConfig).backendDomain + this.mediumPath;
    }
    if (this.largePath.indexOf('/') === 0) {
      this.largePath =
        (appConfig() as AppConfig).backendDomain + this.largePath;
    }
  }

  @OneToMany(() => CategoryEntity, (category) => category.file)
  category: CategoryEntity[];

  @OneToMany(() => ProductFileEntity, (productFile) => productFile.file)
  @JoinColumn({ name: 'productFileId' })
  productFile: ProductFileEntity[];

  @OneToOne(() => UserEntity, (user) => user.file)
  user: UserEntity;

  @OneToOne(() => DiscountEntity, (discount) => discount.file)
  @JoinColumn({ name: 'discountId' })
  discount: DiscountEntity;

  @OneToMany(() => GalleryEntity, (gallery) => gallery.file)
  @JoinColumn({ name: 'galleryId' })
  gallery: GalleryEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
