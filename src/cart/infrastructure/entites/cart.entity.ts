import { CustomerEntity } from 'src/customer/infrastructure/entites/customer.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'cart',
})
export class CartEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 

  @ManyToOne(() => CustomerEntity, (customer) => customer.cart)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column()
  qty: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
