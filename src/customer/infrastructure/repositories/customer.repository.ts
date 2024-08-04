import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerAbstractRepository } from './customer.abstract.repository';
import { CustomerEntity } from '../entites/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerMapper } from '../mappers/customer.mapper';

@Injectable()
export class CustomerRepository implements CustomerAbstractRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findAll() {
    const customers = await this.customerRepository.find({
      relations: { user: true },
    });
    return CustomerMapper.toDomain(customers);
  }

  async findByContactDetails(contactDetails: any) {
    const user = await this.customerRepository.findOne({
      where: {
        contactNo: contactDetails.contactNo,
        dialCode: contactDetails.dialCode,
      },
      relations: ['user'],
    });
    return CustomerMapper.toDomain(user);
  }

  async update(data) {
    // await this.customerRepository.
  }

  async resetPasswd(email: string, newPassword: string) {
 
  }
}
