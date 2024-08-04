import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerPersistenceModule } from './infrastructure/customer-persistence.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { RoleModule } from 'src/role-permission-management/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    CustomerPersistenceModule,
    TransactionModule,
    RoleModule,
    UserModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
