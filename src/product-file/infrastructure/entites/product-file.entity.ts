import { FileEntity } from 'src/files/infrastructure/entities/file.entity';
import { ProductEntity } from 'src/product-management/product/infrastructure/entites/product.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'productFile',
})
export class ProductFileEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FileEntity, (file) => file.productFile)
  @JoinColumn({ name: 'fileId' })
  file: FileEntity;

  @Column({ default: false, nullable: true })
  isDefault: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.productFile)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
