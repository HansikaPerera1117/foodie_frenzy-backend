import { StatusEnum } from 'src/common/enum/status.enum';
import { RolePermissionEntity } from 'src/role-permission-management/role-permission/infrastructure/entites/role-permission.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
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
  name: 'role',
})
export class RoleEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int', default: StatusEnum.ACTIVE })
  status: number;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity[];

  @OneToMany(
    () => RolePermissionEntity,
    (rolePermission) => rolePermission.role,
  )
  rolePermission: RolePermissionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
