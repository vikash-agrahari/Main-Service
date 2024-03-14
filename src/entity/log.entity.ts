import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { LogDto } from 'src/modules/payment/transaction/dto/transaction.dto';
import { Dao } from 'src/providers/database/dao.provider';
import { ILog } from 'src/schema/log.schema';

@Injectable()
export class LogEntity extends Dao {
  constructor(@Inject('LOG_MODEL') private logModel: Model<ILog>) {
    super(logModel);
  }
 
  async create(logDto: LogDto) {
    const user = await this.saveData(logDto);
    return user;
  }
 
}
