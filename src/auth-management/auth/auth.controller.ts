import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CommonLoginDto } from './dto/common-login.dto';
import { Prefixes } from 'src/utils/prefixes';
import { CommonValidateOtpDto } from './dto/common-validate-otp.dto';
import { ValidateMethodEnum } from 'src/common/enum/validateMethod.enum';
import { UserTypeEnum } from 'src/common/enum/userType.enum';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * login with email and passowrd
   * @param roleName  route the funtion via role name CUSTOMER or ADMIN
   * @returns the token and permission if it admin and return the role and use details
   */

  @Post('auth/login/email/:userType')
  loginByEmail(
    @Param('userType') userType: string,
    @Body() data: CommonLoginDto,
  ) {
    return this.authService.loginByEmail(userType, data);
  }

  @Post('auth/' + 'validate-otp/' + ':validateMethod')
  async validateOtp(
    @Param('validateMethod') validateMethod: ValidateMethodEnum,
    @Body() data: CommonValidateOtpDto,
  ) {
    return this.authService.validateOtp(validateMethod, data);
  }

  @Post(Prefixes.customer + 'auth/' + 'register')
  customerRegisterionValidate(@Body() data: any) {
    return this.authService.customerRegisterionValidate(data);
  }

  @Get('auth/get-logged/:userType')
  async getUserByToken(
    @Req() req: any,
    @Param('userType') userType: UserTypeEnum,
  ) {
    const token = req.headers?.authorization?.split('Bearer ')[1];
    return await this.authService.getLoggedUser(token, userType);
  }

  @Get('auth/get-new-token')
  async getNewTokenByRefreshToken(@Req() req) {
    const token = req.headers?.authorization?.split('Bearer ')[1];
    return await this.authService.getNewTokenByRefreshToken(token);
  }
}
