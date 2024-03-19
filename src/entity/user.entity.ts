import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOnboardingDto } from 'src/modules/user/on-boarding/dto/on-boarding.dto';
import { Dao } from 'src/providers/database/dao.provider';
import { IUser } from 'src/schema/user.schema';

@Injectable()
export class UserEntity extends Dao {
  constructor(@Inject('USER_MODEL') private clientModel: Model<IUser>) {
    super(clientModel);
  }

  async create(createUserDto: CreateOnboardingDto) {
    const user = await this.saveData(createUserDto);
    return user;
  }

  async getUserDetails(payload: any, projection: any = {}) {
    return await this.findOne(payload, projection);
  }

  async listing(pipeline: any, params: any) {
    return await this.paginateAggregate(pipeline, params);
  }
  async getUserByEmail(email: string) {
    const data = await this.findOne({email: email});
    return data;
  }

  async getUserById(userId: any){
    const data = await this.findOne({_id: userId});
    return data;
  }
}
