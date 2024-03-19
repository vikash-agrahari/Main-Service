import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAdminSession } from 'src/schema/adminSession.schema';
import { Dao } from 'src/providers/database/dao.provider';
import { CreateAdminSession } from 'src/modules/admin/onboarding/interface/onboarding.interface';

@Injectable()
export class AdminSessionEntity extends Dao {
  constructor(@Inject('ADMIN_SESSION_MODEL') private adminSessionModel: Model<IAdminSession>) {
    super(adminSessionModel);
  }

  async createAdminSession(payload: CreateAdminSession) {
    return await this.saveData(payload);
  }

  // async deleteAdminSession(payload: any, update: any) {
  //   return await this.updateOne(payload, update);
  // }

  async delete(payload: any) {
    try{
      return await this.deleteById(payload);
    }
    catch(error){
      console.error("i got an error",error)
      throw error ;
    }
  }
}
