import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAdmin } from 'src/schema/admin.schema';
import { Dao } from 'src/providers/database/dao.provider';
import { AdminCreateOnboardingDto, AdminLoginDto } from 'src/modules/admin/onboarding/dto/create-onboarding.dto';

@Injectable()
export class AdminEntity extends Dao {
  constructor(@Inject('ADMIN_MODEL') private adminModel: Model<IAdmin>) {
    super(adminModel);
  }

  async create(createOnboardingDto: AdminCreateOnboardingDto): Promise<any> {
    return await this.saveData(createOnboardingDto);
  }

  async login(loginDto: AdminLoginDto): Promise<any> {
    return await this.saveData(loginDto);
  }
  async getUserDetails(payload: any, projection: any = {}) {
    return await this.findOne(payload, projection);
  }
  async updateAdmin(payload: any, update: any) {
    return await this.updateMany(payload, update);
  }

  async updateAdminDetails(_id: string, update: any) {
    return await this.updateOne({ _id }, update);
  }
}
