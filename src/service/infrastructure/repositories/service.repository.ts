import { Injectable } from '@nestjs/common';
import { ServiceAbstractRepository } from './service.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../entites/service.entity';

@Injectable()
export class ServiceRepository implements ServiceAbstractRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}
  delete(serviceId: string) {
    return this.serviceRepository.delete({ id: serviceId });
  }
  create(data: any) {
    return this.serviceRepository.save({
      name: data.name,
      description: data.description,
    });
  }

  findAll() {
    return this.serviceRepository.find({});
  }
}
