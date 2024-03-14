import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserSession } from 'src/schema/userSession.schema';
import { Dao } from 'src/providers/database/dao.provider';
import { CreateClientSession } from 'src/modules/client/on-boarding/interfaces/on-boarding.interface';

@Injectable()
export class UserSessionEntity extends Dao {
  constructor(@Inject('USER_SESSION_MODEL') private userSessionModel: Model<IUserSession>) {
    super(userSessionModel);
  }

  // async removeUserSession(payload: any) {
  //   return await this.updateMany(payload, update);
  // }

  async createUserSession(payload: CreateClientSession) {
    return await this.saveData(payload);
  }
  async getUserSessionDetails(payload: any, projection: any = {}) {
    return await this.findOne(payload, projection);
  }

  async deleteUserSession(payload: any) {
    return await this.deleteMany(payload);
  }
}
