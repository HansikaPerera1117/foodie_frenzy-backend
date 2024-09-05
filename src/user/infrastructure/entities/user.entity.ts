import { StatusEnum } from 'src/common/enum/status.enum';
import { CustomerEntity } from 'src/customer/infrastructure/entites/customer.entity';
import { FileEntity } from 'src/files/infrastructure/entities/file.entity';
import { ReservationEntity } from 'src/reservation/infrastructure/entites/reservation.entity';
import { ReviewEntity } from 'src/review/infrastructure/entites/review.entity';
import { RoleEntity } from 'src/role-permission-management/role/infrastructure/entites/role.entity';
import { StaffEntity } from 'src/staff/infrastructure/entites/staff.entity';
import { StockEntity } from 'src/stock/infrastructure/entites/stock.entity';
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
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: String, nullable: true })
  username: string;

  @Column({ type: String, nullable: true })
  password: string;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  email: string;

  @Column({ default: StatusEnum.ACTIVE, nullable: true })
  status: number;

  @Column({ type: String, nullable: true })
  deviceId: string;

  @OneToOne(() => StaffEntity, (staff) => staff.user)
  staff: StaffEntity;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer: CustomerEntity;

  @ManyToOne(() => RoleEntity, (role) => role.user)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity | null;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  @JoinColumn({ name: 'reviewId' })
  review: ReviewEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user, {
    nullable: true,
  })
  reservation: ReservationEntity[];

  @OneToOne(() => FileEntity, (file) => file.user, { nullable: true })
  @JoinColumn({ name: 'fileId' })
  file: FileEntity;

  @OneToMany(() => StockEntity, (stock) => stock.user)
  stock: StockEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
