import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role-permission-management/role/infrastructure/entites/role.entity';
import { RoleNameEnum } from 'src/common/enum/role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async run() {
    for (const roleName of Object.values(RoleNameEnum)) {
      const existingRole = await this.repository.findOne({
        where: { name: roleName },
      });

      if (!existingRole) {
        const newRole = this.repository.create({
          name: roleName,
          isDefault: true,
        });
        await this.repository.save(newRole);
      }
    }
    return true;
  }
}
