import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { CreateOnboardingDto, ForgotOtpDto, ForgotPasswordDto, LoginDto, OtpDto, ResetPasswordDto } from './dto/on-boarding.dto';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { GuardService } from 'src/guards/guards.service';
import { CONSTANT } from 'src/common/constant';
import {
  CreateUserSession,
  UserDetails,
  UserSession,
} from './interfaces/on-boarding.interface';
import { UserSessionEntity } from 'src/entity/userSession.entity';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from 'src/providers/firebase/firebase.service';
import { KafkaService } from 'src/providers/kafka/kafka.service';
import { generateOtp } from 'src/common/utils';
import { TwilioCommService } from 'src/providers/twilio/twilio.service';

@Injectable()
export class UserOnBoardingService {
  constructor(
    private readonly userEntity: UserEntity,
    private readonly guardService: GuardService,
    private readonly userSessionEntity: UserSessionEntity,
    private config: ConfigService,
    private readonly firebaseService: FirebaseService,
    private readonly kafkaService: KafkaService,
    private readonly twilioService: TwilioCommService

  ) {}

  // async signUpFirebase(createOnboardingDto: CreateOnboardingDto) {
  //   try {
  //     const decodedToken = await this.firebaseService.verifyIdToken(
  //       createOnboardingDto.idToken,
  //     );

  //     if (!decodedToken)
  //       throw new ConflictException({
  //         message: RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN,
  //       });

  //     const currentTime: number = Math.floor(new Date().getTime() / 1000);

  //     if (currentTime > decodedToken.exp) {
  //       throw new BadRequestException(RESPONSE_MSG.FIREBASE_ID_TOKEN_EXPIRED);
  //     }

  //     const checkEmail = await this.userEntity.getUserByEmail(
  //       createOnboardingDto.email,
  //     );

  //     if (checkEmail) {
  //       return [RESPONSE_DATA.USER_ALREADY_EXIST, {}];
  //     }
  //     createOnboardingDto.password = this.guardService.hashData(
  //       createOnboardingDto.password,
  //       CONSTANT.PASSWORD_HASH_SALT,
  //     );
  //     const { idToken, ...userData } = createOnboardingDto;

  //     const createUser = Object.assign(userData);

  //     const data = await this.userEntity.create(createUser);

  //     return [RESPONSE_DATA.SUCCESS, { id: data._id }];
  //   } catch (error) {
  //     console.log('Error in signUp:---------->', error);
  //     return [RESPONSE_DATA.ERROR, {}];
  //   }
  // }

  async signUp(createOnboardingDto: CreateOnboardingDto) {
    try {
      const checkEmail = await this.userEntity.getUserByEmail(
        createOnboardingDto.email,
      );

      if (checkEmail) {
        return [RESPONSE_DATA.USER_ALREADY_EXIST, {}];
      }
      createOnboardingDto.password = this.guardService.hashData(
        createOnboardingDto.password,
        CONSTANT.PASSWORD_HASH_SALT,
      );

      //Otp  will be send to the user mobile no

      const otp = await generateOtp();
      const smsFormat: any = ENUM.SMS.YOUR_OTP(otp);
      await this.twilioService.sendOtp(smsFormat, createOnboardingDto.mobileNo);

      console.log("User  OTP : ", otp);

      const { idToken, ...userData } = createOnboardingDto;

      const createUser = Object.assign(userData);

      createUser['otp'] = {
        otp: otp,
        expireTime: new Date(Date.now() + (CONSTANT.OTP_EXPIRE_TIME * 60 * 1000)),
        isVerified: false,
      };

      const data = await this.userEntity.create(createUser);

      return [RESPONSE_DATA.SUCCESS, { id: data._id }];
    } catch (error) {
      console.log('Error in signUp:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }
  async userDetails(userId: string) {
    return await this.userEntity.getUserDetails({ _id: userId });
  }
  async profileDetails(payload: UserSession) {
    const result = await this.userEntity.getUserDetails({
      _id: payload.userId,
    });
    return [
      RESPONSE_DATA.PROFILE,
      {
        data: result,
      },
    ];
  }

  // async loginFirebase(loginDto: LoginDto) {
  //   //---------------Firebase Token Check-----------------//

  //   const decodedToken = await this.firebaseService.verifyIdToken(
  //     loginDto.idToken,
  //   );

  //   if (!decodedToken)
  //     throw new ConflictException({
  //       message: RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN,
  //     });

  //   const currentTime: number = Math.floor(new Date().getTime() / 1000);

  //   if (currentTime > decodedToken.exp) {
  //     throw new BadRequestException(RESPONSE_MSG.FIREBASE_ID_TOKEN_EXPIRED);
  //   }

  //   const checkUser: UserDetails = await this.userEntity.getUserDetails({
  //     email: loginDto.email,
  //   });
  //   if (!checkUser) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
  //   if (
  //     checkUser.password !==
  //     this.guardService.hashData(loginDto.password, CONSTANT.PASSWORD_HASH_SALT)
  //   )
  //     throw new BadRequestException(RESPONSE_MSG.INVALID_PASSWORD);

  //   if (checkUser.blockedStatus == ENUM.USER_PROFILE_STATUS.BLOCKED)
  //     throw new ForbiddenException(RESPONSE_MSG.ACCOUNT_BLOCKED);
  //   if (checkUser.status == ENUM.USER_PROFILE_STATUS.DELETED)
  //     throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);

  //   await this.userSessionEntity.deleteUserSession({ userId: checkUser._id });

  //   const payload: CreateUserSession = {
  //     userId: checkUser?._id,
  //     status: ENUM.USER_PROFILE_STATUS.ACTIVE,
  //     firebaseData: {
  //       emailToken: loginDto.idToken,
  //     },
  //   };
  //   const sessionData = await this.userSessionEntity.createUserSession(payload);
  //   const token = await this.guardService.jwtTokenGeneration({
  //     type: 'USER_LOGIN',
  //     sessionId: sessionData.id,
  //     userId: checkUser._id,
  //   });

  //   const message: Message = {
  //     value: Buffer.from(
  //       JSON.stringify({
  //         message: `User ${checkUser._id} logged in successfully`,
  //         channel: ENUM.CHANNEL_TYPE.EMAIL
  //       }),
  //     ),
  //   };
  //   await this.kafkaService.produce(KAFKA_CONFIG.TOPICS.KAFKA_EVENTS.topic,message);
  //   console.log('message published successfully');
  //   return [
  //     RESPONSE_DATA.LOGIN,
  //     {
  //       token: token,
  //       userId: checkUser._id,
  //     },
  //   ];
  // }

  async login(loginDto: LoginDto) {
    try {
      const checkUser: UserDetails = await this.userEntity.getUserDetails({
        email: loginDto.email,
      });
      if (!checkUser)
        throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
      if (
        checkUser.password !==
        this.guardService.hashData(
          loginDto.password,
          CONSTANT.PASSWORD_HASH_SALT,
        )
      )
        throw new BadRequestException(RESPONSE_MSG.INVALID_PASSWORD);

      if (checkUser.blockedStatus == ENUM.USER_PROFILE_STATUS.BLOCKED)
        throw new ForbiddenException(RESPONSE_MSG.ACCOUNT_BLOCKED);
      if (checkUser.status == ENUM.USER_PROFILE_STATUS.DELETED)
        throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);

      await this.userSessionEntity.deleteUserSession({ userId: checkUser._id });

      const payload: CreateUserSession = {
        userId: checkUser?._id,
        status: ENUM.USER_PROFILE_STATUS.ACTIVE,
      };
      const sessionData =
        await this.userSessionEntity.createUserSession(payload);
      const token = await this.guardService.jwtTokenGeneration({
        type: 'USER_LOGIN',
        sessionId: sessionData.id,
        userId: checkUser._id,
      });
      return [
        RESPONSE_DATA.LOGIN,
        {
          token: token,
          userId: checkUser._id,
        },
      ];
    } catch (error) {
      console.log('Error in Login:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async verifyOtp(otpDto: OtpDto){
    try {
      let userData = await this.userEntity.getUserById(otpDto?.userId);
      if (userData.mobileStatus) throw new ConflictException(RESPONSE_DATA.MOBILE_NO_ALREADY_EXIST);

      if (this.config.get('ENV') === ENUM.ENVIRONMENT.PRODUCTION) {
        if(userData.otp.otp != otpDto.otp){
          throw new BadRequestException(RESPONSE_MSG.INVALID_OTP);
        }
        if (userData.otp.expireTime < new Date()) {
          throw new BadRequestException(RESPONSE_MSG.EXPIRE_OTP);
        }
      }else{
        if (userData.otp.otp != otpDto.otp && otpDto.otp != CONSTANT.BYPASS_OTP) {
          throw new BadRequestException(RESPONSE_MSG.INVALID_OTP);
        }
      }

      await this.userEntity.findOneAndUpdate(
        { _id: userData._id },
        {
          mobileStatus: true,
          status: ENUM.USER_PROFILE_STATUS.ACTIVE,
          'otp.isVerified': true,
        }
      );
      
      return [RESPONSE_DATA.VERIFY_OTP, {}];

    } catch (error) {
      console.log('Error in verifyOtp:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const userData = await this.userEntity.findOne({ mobileNo: forgotPasswordDto.mobileNo, mobileStatus: true });
    if (!userData) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
    const otp = await generateOtp();
    const smsFormat: any = ENUM.SMS.YOUR_OTP(otp);

    await this.twilioService.sendOtp(smsFormat, userData.mobileNo);
    
    return [RESPONSE_DATA.SEND_OTP, { userId: userData._id }];
  }

  async forgotVerifyOtp(otpDto: ForgotOtpDto) {
    const userData = await this.userEntity.findOne({ _id: otpDto.userId });
    if (this.config.get('ENV') === ENUM.ENVIRONMENT.PRODUCTION) {

      if (userData.otp.otp != otpDto.otp) {
        throw new BadRequestException(RESPONSE_MSG.INVALID_OTP);
      }

      if (userData.otp.expireTime < new Date()) {         
        throw new BadRequestException(RESPONSE_MSG.EXPIRE_OTP);
      }
    } else if (userData.otp.otp != otpDto.otp && otpDto.otp != CONSTANT.BYPASS_OTP) {
      throw new BadRequestException(RESPONSE_MSG.INVALID_OTP);
    }
    return [RESPONSE_DATA.SUCCESS, { userId: userData._id }];
  }


  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const checkUser = await this.userEntity.getUserDetails({ _id: resetPasswordDto.userId }, { email: 1 });
    if (!checkUser) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
    if (checkUser.password == this.guardService.hashData(resetPasswordDto.password, CONSTANT.PASSWORD_HASH_SALT))
      throw new BadRequestException(RESPONSE_MSG.SAME_PASSWORD);

    //  remove user session and update password
    await Promise.all([
      this.userSessionEntity.deleteUserSession({ userId: resetPasswordDto.userId }),
      this.userEntity.updateUserDetails(checkUser._id, {
        password: this.guardService.hashData(resetPasswordDto.password, CONSTANT.PASSWORD_HASH_SALT),
      }),
    ]);
    return [RESPONSE_DATA.SUCCESS, {}];
  }
}
