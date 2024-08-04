import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerAbstractRepository } from './infrastructure/repositories/customer.abstract.repository';
import { TransactionService } from 'src/transaction/transaction.service';
import { RoleNameEnum } from 'src/common/enum/role.enum';
import { RoleService } from 'src/role-permission-management/role/role.service';
import {
  CreateCustomerDto,
  CreateCustomerDto as RegisterCustomerDto,
} from './dto/create-customer.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerAbstractRepository,
    private readonly transactionService: TransactionService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  findAll() {
    return this.customerRepository.findAll();
  }

  async findByContactDetails(contactDetails: any) {
    return await this.customerRepository.findByContactDetails(contactDetails);
  }

  async customerRegisterionValidate(data: RegisterCustomerDto) {
    const isExistsEmail = await this.userService.findByEmail(data.email);
    if (isExistsEmail) {
      throw new HttpException(
        `The email ${data.email} is already registered`,
        HttpStatus.CONFLICT,
      );
    }
    const isExistsContactNo =
      await this.customerRepository.findByContactDetails(data);
    if (isExistsContactNo) {
      throw new HttpException(
        `The contact number ${data.contactNo} is already registered`,
        HttpStatus.CONFLICT,
      );
    }
    // const otp = await this.smsService.sendOtp(
    //   data.email,
    //   ValidateMethodEnum.EMAIL,
    // );
    const msg = `An OTP has been sent to ${data.email}`;
    return { msg };
  }

  async registerCustomer(data: CreateCustomerDto) {
    const customerRole = await this.roleService.findRoleByRoleName(
      RoleNameEnum.CUSTOMER,
    );
    data.roleId = customerRole.id;
    return this.transactionService.registerCustomer(data);
  }

  async update(data) {
    return await this.customerRepository.update(data);
  }
  // async resetPasswd(data: ResetPasswdDto) {
  //   const isValidted = await this.smsService.validateOtp(data.email, data.otp);
  //   if (isValidted) {
  //     return this.customerRepository.resetPasswd(data.email, data.newPassword);
  //   }
  //   throw new HttpException('Invalid OTP', HttpStatus.NOT_ACCEPTABLE);
  // }
}
