import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import appConfig from '../../../config/app.config';
import { AppConfig } from 'src/config/app-config.type';
import { CategoryEntity } from 'src/product-management/category/infrastructure/entites/category.entity';
import { ProductEntity } from 'src/product-management/product/infrastructure/entites/product.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';

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
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity[];





  @OneToOne(() => UserEntity, (user) => user.file)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
