import { FileEntity } from 'src/files/infrastructure/entities/file.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'discount',
})
export class DiscountEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'float' })
  value: number;

  @Column()
  startAt: string;

  @Column()
  endAt: string;

  @OneToOne(() => FileEntity, (file) => file.discount)
  // @JoinColumn({ name: 'userId' })
  file: FileEntity;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
