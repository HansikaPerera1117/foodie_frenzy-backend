import { StatusEnum } from 'src/common/enum/status.enum';
import { ProductEntity } from 'src/product-management/product/infrastructure/entites/product.entity';
import { PermissionEntity } from 'src/role-permission-management/permission/infrastructure/entites/permission.entity';
import { Role } from 'src/role-permission-management/role/domain/role';
import { RoleEntity } from 'src/role-permission-management/role/infrastructure/entites/role.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
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
  name: 'review',
})
export class ReviewEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;



  @ManyToOne(() => UserEntity, (user) => user.review)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'float' })
  count: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
