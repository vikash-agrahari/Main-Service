import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { CreateOnboardingDto, LoginDto } from './dto/on-boarding.dto';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { GuardService } from 'src/guards/guards.service';
import { CONSTANT } from 'src/common/constant';
import { CreateUserSession, UserDetails, UserSession, UpdateTapUSer } from './interfaces/on-boarding.interface';
import { UserSessionEntity } from 'src/entity/userSession.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserOnBoardingService {
  constructor(
    private readonly userEntity: UserEntity,
    private readonly guardService: GuardService,
    private readonly userSessionEntity: UserSessionEntity,
    private config: ConfigService,
  ) { }

  async signUp(createOnboardingDto: CreateOnboardingDto) {
    try {
      createOnboardingDto.password = this.guardService.hashData(
        createOnboardingDto.password,
        CONSTANT.PASSWORD_HASH_SALT,
      );
      const userClient = Object.assign(createOnboardingDto);
      const data = await this.userEntity.create(userClient);
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
    const result = await this.userEntity.getUserDetails({ _id: payload.userId });
    return [
      RESPONSE_DATA.PROFILE,
      {
        data: result
      },
    ];
  }

  async login(loginDto: LoginDto) {
    const checkUser: UserDetails = await this.userEntity.getUserDetails({ mobileNo: loginDto.mobileNo });
    if (!checkUser) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
    if (checkUser.password !== this.guardService.hashData(loginDto.password, CONSTANT.PASSWORD_HASH_SALT))
      throw new BadRequestException(RESPONSE_MSG.INVALID_PASSWORD);

    if (checkUser.blockedStatus == ENUM.USER_PROFILE_STATUS.BLOCKED) throw new ForbiddenException(RESPONSE_MSG.ACCOUNT_BLOCKED);
    if (checkUser.status == ENUM.USER_PROFILE_STATUS.DELETED) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);

    await this.userSessionEntity.deleteUserSession({ userId: checkUser._id });

    const payload: CreateUserSession = {
      userId: checkUser?._id,
      status: ENUM.USER_PROFILE_STATUS.ACTIVE
    };
    const sessionData = await this.userSessionEntity.createUserSession(payload);
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
  }
}
