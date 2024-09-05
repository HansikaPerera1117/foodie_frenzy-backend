import { OrderEntity } from 'src/order/infrastructure/entites/order.entity';
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
  name: 'orderItem',
})
export class OrderItemEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItem)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column({ type: 'float' })
  qty: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderItem)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
