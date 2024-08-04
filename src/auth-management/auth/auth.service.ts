import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CustomerService } from '../../customer/customer.service';
import { RoleNameEnum } from '../../common/enum/role.enum';
import { JwtService } from '@nestjs/jwt';
import { CommonLoginDto } from './dto/common-login.dto';
import { RolePermissionService } from 'src/role-permission-management/role-permission/role-permission.service';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CommonValidateOtpDto } from './dto/common-validate-otp.dto';
import { ValidateMethodEnum } from 'src/common/enum/validateMethod.enum';
import { UserTypeEnum } from 'src/common/enum/userType.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  /**
   * Validate the Customer or Admin login
   * @param userType Switch by role name customer or admin
   * @param data data  be Login dto
   * @returns retrun  jwt-tokens with entity the after validate
   */
  async loginByEmail(userType: string, data: CommonLoginDto) {
    switch (userType) {
      case RoleNameEnum.ADMIN:
        return await this.validateStaffLogin(data);

      case RoleNameEnum.CUSTOMER:
        return await this.validateCustomerLogin(data);

      default:
        break;
    }
  }

 
  /**
   * Validate by contact numbe when customer login
   * @param data otp and contact details like contact no,dial code etc
   * @returns retrun the token and user+customer
   */
  async validateOtp(
    validateType: ValidateMethodEnum,
    data: CommonValidateOtpDto,
  ) {
    switch (validateType) {
      case ValidateMethodEnum.EMAIL:
        return this.emailValidateOtp(data.email, data.otp);

      default:
        break;
    }
  }
  
  /**
   * Email validate otp use for whem customer forget the email password.then verify we sended otp
   * @param email input from the mobile app
   * @param otp length 4 otp
   */
  async emailValidateOtp(email: string, otp: string) {
    // const validateOtp = await this.smsService.validateOtp(email, otp);
    // if (!validateOtp) {
    //   throw new HttpException('Invalid OTP', HttpStatus.NOT_ACCEPTABLE);
    // } else {
    //   return 'successs, under development /auth/validate-otp/email  this use for forget password ,then validate the email otp  ';
    // }
  }

  /**
   * Validate CUstomer Login
   * @param data
   * @returnsetrun the token and user+customer object and tokens
   */
  async validateCustomerLogin(data: CommonLoginDto) {
    const isExists = await this.userService.findByEmail(data.email);
    console.log(isExists);

    if (!isExists) {
      throw new HttpException(
        'You enterd email does not exists',
        HttpStatus.NOT_FOUND,
      );
    } else {
      if (isExists.user.password !== data.password) {
        throw new HttpException(
          'Please enter your correct password',
          HttpStatus.NOT_ACCEPTABLE,
        );
      } else {
        if (!isExists.user.customer) {
          throw new HttpException(
            'Admin accounts not supported on mobile devices',
            HttpStatus.FORBIDDEN,
          );
        } else {
          const { password, role, ...userInfo } = isExists.user;
          const token = await this.genereateJwtToken(
            isExists.user.id,
            isExists.user.deviceId,
          );
          return {
            token: token,
            user: userInfo,
          };
        }
      }
    }
  }

  /**
   * Staff login validate by username and password
   * @param data in commonLoginDto.user name and password
   * @returns retrun the token and user+staff object with the permission what he allowed and tokens
   */
  async validateStaffLogin(data: CommonLoginDto) {
    const isExists = await this.userService.findByEmail(data.username);
    if (!isExists) {
      throw new HttpException(
        'You enterd username does not exists',
        HttpStatus.NOT_FOUND,
      );
    } else {
      if (isExists.user.status === 2) {
        throw new HttpException(
          'Sorry! your account has been terminated',
          HttpStatus.NOT_FOUND,
        );
      }
      if (isExists.user.password !== data.password) {
        throw new HttpException(
          'Please enter your correct password',
          HttpStatus.NOT_ACCEPTABLE,
        );
      } else {
        if (!isExists.user.staff) {
          throw new HttpException(
            'Customer accounts not supporte on admin panel',
            HttpStatus.FORBIDDEN,
          );
        } else {
          const token = await this.genereateJwtToken(
            isExists.user.id,
            isExists.user.deviceId,
          );
          const permissions =
            await this.rolePermissionService.findAllPermissionsByRoleId(
              isExists.user.role.id,
            );
          return {
            token: token,
            user: isExists.user,
            permissions: permissions,
          };
        }
      }
    }
  }

  /**
   * Genereate JWT  access_token and refresh_token
   * @param userId  @param device_token Generate token with the userId and device_token
   * @returns retrun the gendrated tokens
   */
  async genereateJwtToken(userId: string, device_token: string) {
    return Promise.all([
      this.generateAccessToken(userId, device_token),
      this.generateRefreshToken(userId, device_token),
    ]).then(([at, rt]) => {
      return { access_token: at, refresh_token: rt };
    });
  }

  /**
   * Genereate JWT  access_token
   * @param userId  @param device_token Generate accsess token with the userId and device_token and exp_time
   * @returns retrun the gendrated accesss tokens
   */
  generateAccessToken = (userId: string, device_token: string) =>
    this.jwtSign(userId, device_token, 300);

  /**
   * Genereate JWT  refresh_token
   * @param userId  @param device_token Generate refresh token with the userId and device_token and exp_time
   * @returns retrun the gendrated refresh tokens
   */
  generateRefreshToken = (userId: string, device_token: string) =>
    this.jwtSign(userId, device_token, 60 * 60 * 24 * 7);

  //jwt token with expire time
  async jwtSign(userId: string, device_token: string, expire_time: number) {
    return this.jwtService.sign(
      { userId, device_token },
      { secret: process.env.AUTH_JWT_SECRET, expiresIn: expire_time },
    );
  }

 
  async customerRegisterionValidate(data: any) {
    return await this.customerService.customerRegisterionValidate(data);
  }

  /**
   * get user object and customer or admin object by jwt token
   * @param token  include with userId and device_id with exp time
   * @param userType CUSTOMER or ADMIN
   */
  async getLoggedUser(token: string, userType: string) {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.AUTH_JWT_SECRET,
      });
      if (userType === UserTypeEnum.CUSTOMER) {
        const existsCustomer = await this.userService.findById(decoded.userId);
        //exists device token is not equal with decode device token
        // if (customer.user.device_token !== decoded.device_token) {
        //   throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);
        // }
        const { password, role, ...userInfo } = existsCustomer.user;
        return { user: userInfo };
      } else if (userType === UserTypeEnum.ADMIN) {
        console.log('admin');

        // return await this.adminService.findByUserId(decoded.userId); // Find staff
      }
      return decoded;
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);
      } else if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);
        // throw new Exception(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

 
  async getNewTokenByRefreshToken(refresh_token: string) {
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.AUTH_JWT_SECRET,
      });
      const isExists = await this.userService.findById(decoded.userId);
      const at = await this.generateAccessToken(
        decoded.userId,
        decoded.deviceId,
      );
      return { access_token: at, refresh_token: refresh_token };
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);
      } else if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE); // or Send INTERNAL SERVER ERROR
      }
    }
  }

 
 
  
}
