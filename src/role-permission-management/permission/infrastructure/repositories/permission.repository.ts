import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionAbstractRepository } from './permission.abstract.repository';
import { PermissionEntity } from '../entites/permission.entity';
import { PermissionMapper } from '../mappers/permission.mapper';

@Injectable()
export class PermissionRepository implements PermissionAbstractRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAll() {
    const permissoins = await this.permissionRepository.find();
    return PermissionMapper.toDomain(permissoins);
  }
  findOne(permissionId: string) {
    throw new Error('Method not implemented.');
  }


  
}
