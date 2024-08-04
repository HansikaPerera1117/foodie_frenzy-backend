import { PermissionEntity } from 'src/role-permission-management/permission/infrastructure/entites/permission.entity';
import { RoleEntity } from 'src/role-permission-management/role/infrastructure/entites/role.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'rolePermission',
})
export class RolePermissionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string; 
 
  @ManyToOne(() => RoleEntity, (role) => role.rolePermission)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity, (permission) => permission.rolePermission)
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
