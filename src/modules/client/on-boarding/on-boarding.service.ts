import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/entity/client.entity';
import { CreateOnboardingDto, LoginDto } from './dto/on-boarding.dto';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { GuardService } from 'src/guards/guards.service';
import { CONSTANT, TAP_CONSTANT } from 'src/common/constant';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateClientSession, UserDetails, UserSession, UpdateTapUSer } from './interfaces/on-boarding.interface';
import { UserSessionEntity } from 'src/entity/userSession.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientOnBoardingService {
  constructor(
    private readonly clientEntity: ClientEntity,
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

      const createClient = Object.assign(createOnboardingDto);

      const data = await this.clientEntity.create(createClient);

      const tapPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNo: data.mobileNo,
        email: data.email,
        clientId: data._id
      }
      const tap = await this.createTapUser(tapPayload)
      await this.clientEntity.findOneAndUpdate({ _id: data._id },{tapId:tap.id});

      return [RESPONSE_DATA.SUCCESS, { id: data._id }];
    } catch (error) {
      console.log('Error in signUp:---------->', error);
      return [RESPONSE_DATA.ERROR, {}];
    }
  }

  async createTapUser(payload: any) {
    const url = TAP_CONSTANT.USER_CREATE_URL;
    const headers = {
      'Content-Type': TAP_CONSTANT.contentType,
      Authorization: `Bearer ${this.config.get('TAP_SECRET')}`,
    };
    const axiosConfig: AxiosRequestConfig = {
      headers,
    };
    const data = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: {
        number: payload.mobileNo,
      },
      description: 'User Created',
      metadata: {
        clientId: payload.clientId,
      },
      currency: 'BHD',
    };

    try {
      const response: AxiosResponse = await axios.post(url, data, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      // ykaApiCallLogger.error(error);
      if (axios.isAxiosError(error)) {
        console.log('axios error details:', error.response?.data);
        return [RESPONSE_DATA.ERROR, {}];
      }
    }
  }

  async userDetails(userId: string) {
   return await this.clientEntity.getUserDetails({ _id: userId });
  }
  async profileDetails(payload: UserSession) {
    const result = await this.clientEntity.getUserDetails({ _id: payload.userId });
    return [
      RESPONSE_DATA.PROFILE,
      {
        data: result
      },
    ];
  }

  async login(loginDto: LoginDto) {
    const checkUser: UserDetails = await this.clientEntity.getUserDetails({ mobileNo: loginDto.mobileNo });
    if (!checkUser) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
    if (checkUser.password !== this.guardService.hashData(loginDto.password, CONSTANT.PASSWORD_HASH_SALT))
      throw new BadRequestException(RESPONSE_MSG.INVALID_PASSWORD);

    if (checkUser.blockedStatus == ENUM.CLIENT_PROFILE_STATUS.BLOCKED) throw new ForbiddenException(RESPONSE_MSG.ACCOUNT_BLOCKED);
    if (checkUser.status == ENUM.CLIENT_PROFILE_STATUS.DELETED) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);

    await this.userSessionEntity.deleteUserSession({ clientId: checkUser._id });

    const payload: CreateClientSession = {
      clientId: checkUser?._id,
      status: ENUM.CLIENT_PROFILE_STATUS.ACTIVE
    };
    const sessionData = await this.userSessionEntity.createUserSession(payload);
    const token = await this.guardService.jwtTokenGeneration({
      type: 'USER_LOGIN',
      sessionId: sessionData.id,
      clientId: checkUser._id,
    });
    return [
      RESPONSE_DATA.LOGIN,
      {
        token: token,
        clientId: checkUser._id,
      },
    ];
  }

  async getUserSavedCard(payload: UserSession) {
		try {
			const userDetails = await this.clientEntity.getUserDetails({ _id: payload.userId });
			const cardList = await this.getTapCardsList(userDetails.tapId);
      return [
        RESPONSE_DATA.PROFILE,
        {
          data: cardList
        },
      ];
		} catch (err) {
			throw err;
		}
	}

  async getTapCardsList(tapId: string) {
    const url = `https://api.tap.company/v2/card/${tapId}`;
    const headers = {
      'Content-Type': TAP_CONSTANT.contentType,
      Authorization: `Bearer ${this.config.get('TAP_SECRET')}`,
    };
    const axiosConfig: AxiosRequestConfig = {
      headers,
    };
  
    try {
      console.log('url ===== >', url);
      const response: AxiosResponse= await axios.get(
        url,
        axiosConfig,
      );
      console.log('response ===== >', response);
      return response.data;;
      
    
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error details:', error.response?.data);
        return [RESPONSE_DATA.ERROR, {}];
      }
    }
  }

}
