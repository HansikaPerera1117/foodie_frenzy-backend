import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { StatusEnum } from 'src/statuses/statuses.enum';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { StaffEntity } from 'src/staff/infrastructure/entites/staff.entity';
import { RoleEntity } from 'src/role-permission-management/role/infrastructure/entites/role.entity';
import { RoleNameEnum } from 'src/common/enum/role.enum';
import { PermissionEntity } from 'src/role-permission-management/permission/infrastructure/entites/permission.entity';
import { RolePermissionEntity } from 'src/role-permission-management/role-permission/infrastructure/entites/role-permission.entity';
// import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
// import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(RolePermissionEntity)
    private rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  async run() {
    await this.create();
    return await this.assigneAllPermissions();
  }

  async create() {
    const seedEmail: string = 'super.admin@example.com';
    const isExists = await this.userRepository.findOne({
      where: { email: seedEmail },
    });

    if (!isExists) {
      const superAdminRole = await this.findRoleByName(
        RoleNameEnum.SUPER_ADMIN,
      );
      const createdUser = await this.userRepository.save({
        username: seedEmail,
        password: 'secret',
        deviceId: 'device id',
        firstName: 'Super',
        lastName: 'Admin',
        email: seedEmail,
        role: superAdminRole,
      });
      await this.staffRepository.save({
        user: createdUser,
        contactNo: '+xx xxx xxxx',
      });
      return createdUser;
    }
  }

  async findRoleByName(roleName: string) {
    return await this.roleRepository.findOne({
      where: {
        name: roleName,
      },
    });
  }

  async assigneAllPermissions() {
    const role = await this.findRoleByName(RoleNameEnum.SUPER_ADMIN);

    const allPermissions = await this.findAllPermissions();

    for (let permission of allPermissions) {
      const permissionId = permission.id;
      const isExists = await this.isExsitsRolePermission(
        role?.id,
        permissionId,
      );
      if (!isExists) {
        await this.rolePermissionRepository.save({
          role: { id: role?.id },
          permission: { id: permissionId },
        });
      }
    }
  }

  async findAllPermissions() {
    return await this.permissionRepository.find({ select: { id: true } });
  }

  async isExsitsRolePermission(roleId: any, permissionId: string) {
    return await this.rolePermissionRepository.findOne({
      where: {
        role: {
          id: roleId,
        },
        permission: {
          id: permissionId,
        },
      },
    });
  }
}
