import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENUM } from 'src/common/enum';
import { AdminEntity } from 'src/entity/admin.entity';
import { GuardService } from 'src/guards/guards.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  AdminForgotPasswordDto,
  AdminLoginDto,
  AdminOtpDto,
  AdminResetPasswordDto,
} from './dto/create-onboarding.dto';
import { CONSTANT } from 'src/common/constant';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { CreateAdminSession } from './interface/onboarding.interface';
import { AdminSessionEntity } from 'src/entity/adminSession.entity';
import { generateOtp, generateToken } from 'src/common/utils';
import { ApplicationError } from 'src/common/applicationError';

@Injectable()
export class OnboardingService {
  httpResponse: any;
  constructor(
    private readonly adminEntity: AdminEntity,
    private readonly guardService: GuardService,
    private readonly configService: ConfigService,
    private readonly adminSessionEntity: AdminSessionEntity,
    private readonly mailerService: MailerService,
  ) {
    this.createAdmin();
  }

  // Bootstrap function for creating admin credentials

  async createAdmin() {
    const data = await this.adminEntity.findOne({
      email: this.configService.get<string>('ADMIN_EMAIL'),
      password: this.configService.get<string>('ADMIN_PASSWORD'),
      name: this.configService.get<string>('ADMIN_NAME'),
      mobileNo: this.configService.get<string>('ADMIN_MOBILE_NO'),
    });
    if (!data) {
      const email: any = this.configService.get<string>('ADMIN_EMAIL');
      const password: any = this.configService.get<string>('ADMIN_PASSWORD');
      const name: any = this.configService.get<string>('ADMIN_NAME');
      const mobileNo: any = this.configService.get<string>('ADMIN_MOBILE_NO');
      return await this.adminEntity.saveDataInBackground({
        name: name,
        email: email.toLowerCase(),
        password: this.guardService.hashData(password, CONSTANT.PASSWORD_HASH_SALT),
        mobileNo: mobileNo,
      });
    }
  }

  async login(adminLoginDto: AdminLoginDto) {
    adminLoginDto.email = adminLoginDto.email.toLowerCase();
    const checkData = await this.adminEntity.getUserDetails(
      { email: adminLoginDto.email },
      { mobileNo: 1, password: 1, email: 1 },
    );
    if (!checkData) throw new BadRequestException(RESPONSE_MSG.EMAIL_NOT_EXIST);

    if (
      checkData.password !==
      this.guardService.hashData(
        adminLoginDto.password,
        CONSTANT.PASSWORD_HASH_SALT,
      )
    )
      throw new BadRequestException(RESPONSE_MSG.INVALID_PASSWORD);
    const payload: CreateAdminSession = {
      adminId: checkData._id,
      status: ENUM.USER_PROFILE_STATUS.ACTIVE,
    };
    await this.adminSessionEntity.deleteMany({ adminId: checkData._id });
    const sessionData =
      await this.adminSessionEntity.createAdminSession(payload);
    const token = await this.guardService.jwtTokenGeneration({
      type: 'ADMIN_LOGIN',
      sessionId: sessionData.id,
      adminId: checkData._id,
    });
    return [
      RESPONSE_DATA.LOGIN,
      {
        token: token,
        adminId: checkData._id,
        name: checkData.name,
        email: checkData.email,
        mobileNo: checkData.mobileNo,
        title: checkData.title,
      },
    ];
  }

  async forgotPassword(adminForgotPasswordDto: AdminForgotPasswordDto) {
    try {
      let otp = await generateOtp();
      const admin = await this.adminEntity.getAdminDetails({
        email: adminForgotPasswordDto.email,
      });
      console.log('admin details is', admin);
      if (!admin) throw new BadRequestException(RESPONSE_DATA.EMAIL_NOT_EXIST);

      let payload = {
        otp: {
          otp: otp,
          expiry: new Date(Date.now() + 600000),
          isVerified: false,
        },
      };
      await this.adminEntity.updateAdminDetails(admin._id, payload);
      const mailOptions = {
        from: this.configService.get<string>('EMAIL'),
        to: adminForgotPasswordDto.email,
        subject: 'forgot password otp',
        html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      };
      await this.mailerService.sendMail({
        ...mailOptions,
        from: this.configService.get<string>('EMAIL_FROM'),
      });
    } catch (error) {
      console.error('error is', error);
      throw new BadRequestException('Failed to send OTP');
    }
  }

  async otpVerify(AdminOtpDto: AdminOtpDto) {
    try {
      const secret_key = this.configService.get<string>('SECRET_KEY') || '';
      const admin = await this.adminEntity.getAdminDetails({
        _id: AdminOtpDto.adminId,
      });

      if (admin.otp.otp != AdminOtpDto.otp)
      throw new ApplicationError("BadRequestError", {
        statusCode: HttpStatus.BAD_REQUEST,
        message: RESPONSE_MSG.INVALID_OTP
      }
    )
      if (admin.otp.expiry < Date.now() || admin.otp.isVerified == 'true')
        throw new ApplicationError("BadRequestError", {
          statusCode: HttpStatus.BAD_REQUEST,
          message: RESPONSE_MSG.EXPIRE_OTP
        })

      if (AdminOtpDto.otp == admin.otp.otp) {
        await this.adminEntity.updateAdminDetails(admin._id, {
          otp: { ...admin.otp, isVerified: true },
        });
        const newToken = await generateToken(AdminOtpDto.adminId, secret_key);
        return newToken;
    }
    } catch (error) {
      console.error('error in otp verify', error);
      throw error;
    }
  }

  async resetPassword(adminResetPassword: AdminResetPasswordDto) {
    const checkUser = await this.adminEntity.getUserDetails({
      _id: adminResetPassword.adminId,
    });
    if (!checkUser)
    throw new ApplicationError("BadRequestError", {
      statusCode: HttpStatus.BAD_REQUEST,
      message: RESPONSE_MSG.USER_NOT_EXIST
    })
    if (
      checkUser.password ==
      this.guardService.hashData(
        adminResetPassword.password,
        CONSTANT.PASSWORD_HASH_SALT,
      )
    )
    throw new ApplicationError("BadRequestError", {
      statusCode: HttpStatus.BAD_REQUEST,
      message: RESPONSE_MSG.SAME_PASSWORD
    })
    this.adminEntity.updateAdminDetails(checkUser._id, {
      password: this.guardService.hashData(
        adminResetPassword.password,
        CONSTANT.PASSWORD_HASH_SALT,
      ),
    });
  }
}
