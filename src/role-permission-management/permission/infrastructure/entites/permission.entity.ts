import { RolePermissionEntity } from 'src/role-permission-management/role-permission/infrastructure/entites/role-permission.entity';
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
  name: 'permission',
})
export class PermissionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  parentId: string | null;

  @ManyToOne(() => PermissionEntity, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parentPermission: PermissionEntity;

  @OneToMany(
    () => RolePermissionEntity,
    (rolePermission) => rolePermission.permission,
  )
  rolePermission: RolePermissionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
