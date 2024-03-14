import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENUM } from 'src/common/enum';
import { AdminEntity } from 'src/entity/admin.entity';
import { GuardService } from 'src/guards/guards.service';
import { AdminLoginDto } from './dto/create-onboarding.dto';
import { CONSTANT } from 'src/common/constant';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { CreateAdminSession } from './interface/onboarding.interface';
import { AdminSessionEntity } from 'src/entity/adminSession.entity';
@Injectable()
export class OnboardingService {
  httpResponse: any;
  constructor(
    private readonly adminEntity: AdminEntity,
    private readonly guardService: GuardService,
    private readonly configService: ConfigService,
    private readonly adminSessionEntity: AdminSessionEntity,
  ) {
    // this.createAdmin();
  }

  // Bootstrap function for creating admin credentials

  // async createAdmin() {
  //   const data = await this.adminEntity.findOne({
  //     email: this.configService.get<string>('ADMIN_EMAIL'),
  //     password: this.configService.get<string>('ADMIN_PASSWORD'),
  //     name: this.configService.get<string>('ADMIN_NAME'),
  //     countryCode: this.configService.get<string>('ADMIN_COUNTRY_CODE'),
  //     mobileNo: this.configService.get<string>('ADMIN_MOBILE_NO'),
  //   });
  //   if (!data) {
  //     const email: any = this.configService.get<string>('ADMIN_EMAIL');
  //     const password: any = this.configService.get<string>('ADMIN_PASSWORD');
  //     const name: any = this.configService.get<string>('ADMIN_NAME');
  //     const countryCode: any = this.configService.get<string>('ADMIN_COUNTRY_CODE');
  //     const mobileNo: any = this.configService.get<string>('ADMIN_MOBILE_NO');
  //     return await this.adminEntity.saveDataInBackground({
  //       name: name,
  //       email: email.toLowerCase(),
  //       password: this.guardService.hashData(password, CONSTANT.PASSWORD_HASH_SALT),
  //       countryCode: countryCode,
  //       mobileNo: mobileNo,
  //     });
  //   }
  // }


  async login(adminLoginDto: AdminLoginDto) {
    adminLoginDto.email = adminLoginDto.email.toLowerCase();
    const checkData = await this.adminEntity.getUserDetails({ email: adminLoginDto.email }, { mobileNo: 1, password: 1, email: 1 });
    if (!checkData) throw new BadRequestException(RESPONSE_MSG.EMAIL_NOT_EXIST);

    if (checkData.password !== this.guardService.hashData(adminLoginDto.password, CONSTANT.PASSWORD_HASH_SALT))
      throw new BadRequestException(RESPONSE_MSG.INVALID_PASSWORD);
      const payload: CreateAdminSession = {
        adminId: checkData._id,
        status: ENUM.CLIENT_PROFILE_STATUS.ACTIVE,
      };
      await this.adminSessionEntity.deleteMany({ adminId: checkData._id });
      const sessionData = await this.adminSessionEntity.createAdminSession(payload);
      const token = await this.guardService.jwtTokenGeneration({
        type: 'ADMIN_LOGIN',
        sessionId: sessionData.id,
        adminId: checkData._id,
      });
      return [RESPONSE_DATA.LOGIN,  {
        token: token,
        adminId: checkData._id,
        name: checkData.name,
        email: checkData.email,
        mobileNo: checkData.mobileNo,
        title: checkData.title,
      } ];
  }


}
