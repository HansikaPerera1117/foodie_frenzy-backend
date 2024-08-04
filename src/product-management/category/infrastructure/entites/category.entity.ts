import { StatusEnum } from 'src/common/enum/status.enum';
import { FileEntity } from 'src/files/infrastructure/entities/file.entity';
import { ProductEntity } from 'src/product-management/product/infrastructure/entites/product.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'category',
})
export class CategoryEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: string | null;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: CategoryEntity;

  @ManyToOne(() => FileEntity, (file) => file.category)
  @JoinColumn({ name: 'fileId' })
  file: FileEntity;

  @Column({ type: 'int', default: StatusEnum.ACTIVE })
  status: number;

  @OneToMany(() => ProductEntity, (product) => product.category, {
    nullable: true,
  })
  product: ProductEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
