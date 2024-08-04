import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleAbstractRepository } from './infrastructure/repositories/role.abstract.repository';
import { RoleDto } from './dto/role.dto';
import { StatusEnum } from 'src/common/enum/status.enum';
import { RoleFiltersDto } from './dto/role-filters.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleAbstractRepository) {}
  findById(roleId: string, withPermission: boolean) {
    return this.roleRepository.findById(roleId, withPermission);
  }

  async create(data: RoleDto) {
    const isExists = await this.roleRepository.findRoleByRoleName(data.name);
    if (!isExists) {
      console.log('create');
      return this.roleRepository.create(data);
    } else if (isExists.status == StatusEnum.ACTIVE) {
      throw new HttpException(
        `${data.name} alredy exsits active status`,
        HttpStatus.CONFLICT,
      );
    } else if (isExists.status == StatusEnum.INACTIVE) {
      throw new HttpException(
        `${data.name}  alredy exsits inactive status,activate please`,
        HttpStatus.CONFLICT,
      );
    }
  }

  findAll(filters: RoleFiltersDto) {
    return this.roleRepository.findAll(filters);
  }
  update(roleId: string, data: any) {
    return this.roleRepository.update(roleId, data);
  }
  findRoleByRoleName(roleName: string) {
    return this.roleRepository.findRoleByRoleName(roleName);
  }

  // findByName(roleName: string) {
  //   return this.roleRepository.findByName(roleName);
  // }
}
