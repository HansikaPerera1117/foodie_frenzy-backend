import { PaymentStatusEnum } from 'src/common/enum/payment-status.enum';
import { OrderEntity } from 'src/order/infrastructure/entites/order.entity';
import { ReservationEntity } from 'src/reservation/infrastructure/entites/reservation.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'payment',
})
export class PaymentEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'float' })
  amount: number;

  @Column({ default: PaymentStatusEnum.SUCCESS })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  callBackResponse: Record<string, any>;

  @OneToOne(() => ReservationEntity, (reservation) => reservation.payment)
  reservation: ReservationEntity;

  @ManyToOne(() => OrderEntity, (order) => order.payment)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
