import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import mongoose from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONSTANT } from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { RESPONSE_MSG } from 'src/common/responses';
import { AdminEntity } from 'src/entity/admin.entity';
import { AdminSessionEntity } from 'src/entity/adminSession.entity';
import { ClientEntity } from 'src/entity/client.entity';
import { UserSessionEntity } from 'src/entity/userSession.entity';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'adminJWT') {
  constructor(private readonly adminEntity: AdminEntity, private readonly adminSessionEntity: AdminSessionEntity) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONSTANT.JWT_PASSWORD,
    });
  }

  async validate(payload: { adminId: string; sessionId: string }) {
    if (payload) {
      const [adminData, sessionData] = await Promise.all([
        this.adminEntity.findOne({ _id: new mongoose.Types.ObjectId(payload.adminId) }),
        this.adminSessionEntity.findOne({ _id: new mongoose.Types.ObjectId(payload.sessionId), status: ENUM.CLIENT_PROFILE_STATUS.ACTIVE }),
      ]);
      if (!sessionData) throw new UnauthorizedException(RESPONSE_MSG.SESSION_EXPIRED);
      if (!adminData) throw new UnauthorizedException(RESPONSE_MSG.USER_NOT_EXIST);

      console.log('*******************   Session Validation End  ******************************');
      const sessionAdmin = {
        sessionId: payload.sessionId,
        adminId: payload.adminId,
        adminData: adminData,
      };
      return sessionAdmin;
    } else throw new UnauthorizedException(RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN);
  }
}

@Injectable()
export class JwtClientStrategy extends PassportStrategy(Strategy, 'clientJWT') {
  constructor(
    private readonly clientEntity: ClientEntity,
    private readonly userSessionEntity: UserSessionEntity,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONSTANT.JWT_PASSWORD,
    });
  }

  async validate(payload: { clientId: string; sessionId: string }) {
    if (payload) {
      const [userData, sessionData] = await Promise.all([
        this.clientEntity.findOne({ _id: payload.clientId }),
        this.userSessionEntity.findOne({ _id: payload.sessionId, status: ENUM.CLIENT_PROFILE_STATUS.ACTIVE }),
      ]);
      if (!sessionData) throw new UnauthorizedException(RESPONSE_MSG.SESSION_EXPIRED);
      if (!userData) throw new UnauthorizedException(RESPONSE_MSG.USER_NOT_EXIST);
      else if (userData.blockedStatus == ENUM.CLIENT_PROFILE_STATUS.BLOCKED) throw new ForbiddenException(RESPONSE_MSG.ACCOUNT_BLOCKED);
      else if (userData.status == ENUM.CLIENT_PROFILE_STATUS.DELETED) throw new UnauthorizedException(RESPONSE_MSG.USER_NOT_EXIST);
        console.log('*******************   Session Validation End For User ******************************');
        const sessionUser = {
          sessionId: payload.sessionId,
          userId: payload.clientId,
          userData:userData ,
        };
        return sessionUser;
    } else throw new UnauthorizedException(RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN);
  }
}


