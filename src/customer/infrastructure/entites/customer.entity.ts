import { CartEntity } from 'src/cart/infrastructure/entites/cart.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
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
  name: 'customer',
})
export class CustomerEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ nullable: true })
  contactNo: string;

  @Column({ nullable: true })
  dialCode: string;

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => CartEntity, (cart) => cart.customer)
  cart: CartEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
