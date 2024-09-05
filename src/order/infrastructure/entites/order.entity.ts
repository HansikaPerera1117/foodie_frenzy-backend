import { OrderStatusEnum } from 'src/common/enum/order-status.enum';
import { OrderItemEntity } from 'src/order-item/infrastructure/entites/order-item.entity';
import { PaymentEntity } from 'src/payment/infrastructure/entites/payment.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: OrderStatusEnum.PENDING, nullable: true })
  status: string;

  @Column({ nullable: true })
  orderType: string;

  @Column()
  orderCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'float', nullable: true })
  discountAmount: number;

  @Column({ type: 'float', nullable: true })
  netTotal: number;

  @Column({ type: 'float' })
  subTotal: number;

  @Column()
  paymentType: string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    nullable: true,
  })
  orderItem: OrderItemEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.order)
  payment: PaymentEntity[];

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  contactNo: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  addressLine: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
