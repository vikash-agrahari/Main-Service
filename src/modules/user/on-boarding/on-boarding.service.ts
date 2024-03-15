import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { CreateOnboardingDto, LoginDto } from './dto/on-boarding.dto';
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
import { Message } from 'kafkajs';
import { producer } from 'src/providers/kafka/kafka.producer';
import { KAFKA_CONFIG } from 'src/interfaces/kafka.config.interface';

@Injectable()
export class UserOnBoardingService {
  constructor(
    private readonly userEntity: UserEntity,
    private readonly guardService: GuardService,
    private readonly userSessionEntity: UserSessionEntity,
    private config: ConfigService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async signUpFirebase(createOnboardingDto: CreateOnboardingDto) {
    try {
      const decodedToken = await this.firebaseService.verifyIdToken(
        createOnboardingDto.idToken,
      );

      if (!decodedToken)
        throw new ConflictException({
          message: RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN,
        });

      const currentTime: number = Math.floor(new Date().getTime() / 1000);

      if (currentTime > decodedToken.exp) {
        throw new BadRequestException(RESPONSE_MSG.FIREBASE_ID_TOKEN_EXPIRED);
      }

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
      const { idToken, ...userData } = createOnboardingDto;

      const createUser = Object.assign(userData);

      const data = await this.userEntity.create(createUser);

      return [RESPONSE_DATA.SUCCESS, { id: data._id }];
    } catch (error) {
      console.log('Error in signUp:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

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
      const { idToken, ...userData } = createOnboardingDto;

      const createUser = Object.assign(userData);

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

  async loginFirebase(loginDto: LoginDto) {
    //---------------Firebase Token Check-----------------//

    const decodedToken = await this.firebaseService.verifyIdToken(
      loginDto.idToken,
    );

    if (!decodedToken)
      throw new ConflictException({
        message: RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN,
      });

    const currentTime: number = Math.floor(new Date().getTime() / 1000);

    if (currentTime > decodedToken.exp) {
      throw new BadRequestException(RESPONSE_MSG.FIREBASE_ID_TOKEN_EXPIRED);
    }

    const checkUser: UserDetails = await this.userEntity.getUserDetails({
      email: loginDto.email,
    });
    if (!checkUser) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
    if (
      checkUser.password !==
      this.guardService.hashData(loginDto.password, CONSTANT.PASSWORD_HASH_SALT)
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
      firebaseData: {
        emailToken: loginDto.idToken,
      },
    };
    const sessionData = await this.userSessionEntity.createUserSession(payload);
    const token = await this.guardService.jwtTokenGeneration({
      type: 'USER_LOGIN',
      sessionId: sessionData.id,
      userId: checkUser._id,
    });

    const message: Message = {
      value: Buffer.from(
        JSON.stringify({
          message: `User ${checkUser._id} logged in successfully`,
          channel: ENUM.CHANNEL_TYPE.EMAIL
        }),
      ),
    };
    await producer.produce(KAFKA_CONFIG.TOPICS.KAFKA_EVENTS.topic,message);
    console.log('message published successfully');
    return [
      RESPONSE_DATA.LOGIN,
      {
        token: token,
        userId: checkUser._id,
      },
    ];
  }

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
}
