import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtService } from '@nestjs/jwt';
import { RolePermissionModule } from 'src/role-permission-management/role-permission/role-permission.module';

@Module({
  imports: [
    UserModule,
    CustomerModule,
    RolePermissionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
