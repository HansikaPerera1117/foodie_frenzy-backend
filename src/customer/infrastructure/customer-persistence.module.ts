import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entites/customer.entity';
import { CustomerAbstractRepository } from './repositories/customer.abstract.repository';
import { CustomerRepository } from './repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [
    {
      provide: CustomerAbstractRepository,
      useClass: CustomerRepository,
    },
  ],
  exports: [CustomerAbstractRepository],
})
export class CustomerPersistenceModule {}
