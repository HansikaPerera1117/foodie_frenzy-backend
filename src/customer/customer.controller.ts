import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto as RegisterCustomerDto } from './dto/create-customer.dto';

@Controller({
  path: 'customer',
})
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Post('register')
  // validateCustomer(@Body() data: RegisterCustomerDto) {
  //   return this.customerService.validateCustomer(data);
  // }

  @Get('find-all')
  findAll() {
    return this.customerService.findAll();
  }
}
