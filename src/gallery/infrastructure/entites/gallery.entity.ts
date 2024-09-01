import { CartEntity } from 'src/cart/infrastructure/entites/cart.entity';
import { FileEntity } from 'src/files/infrastructure/entities/file.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
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
  name: 'gallery',
})
export class GalleryEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FileEntity, (file) => file.gallery)
  @JoinColumn({ name: 'fileId' })
  file: FileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
