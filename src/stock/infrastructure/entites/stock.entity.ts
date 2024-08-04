import { StatusEnum } from 'src/common/enum/status.enum';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'stock',
})
export class StockEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;



  @ManyToOne(() => UserEntity, (user) => user.stock, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  type: string;

  @Column({ type: 'float' })
  qty: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
