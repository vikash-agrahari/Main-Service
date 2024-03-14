import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { LogDto, TransactionDto } from 'src/modules/payment/transaction/dto/transaction.dto';
import { Dao } from 'src/providers/database/dao.provider';
import { ITransaction } from 'src/schema/transaction.schema';

@Injectable()
export class TransactionEntity extends Dao {
  constructor(@Inject('TRANSACTION_MODEL') private transactionModel: Model<ITransaction>) {
    super(transactionModel);
  }
 
  async create(transactionDto: TransactionDto) {
    const user = await this.saveData(transactionDto);
    return user;
  }

  async getTransactionDetails(payload: any, projection: any = {}) {
    return await this.findOne(payload, projection);
  }
 
}
