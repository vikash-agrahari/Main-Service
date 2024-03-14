import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import{CreateOrderDto} from '../modules/payment/order/dto/order.dto'
import { Dao } from 'src/providers/database/dao.provider';
import { IOrder } from 'src/schema/order.schema';

@Injectable()
export class OrderEntity extends Dao {
  constructor(@Inject('ORDER_MODEL') private orderModel: Model<IOrder>) {
    super(orderModel);
  }
 
  async create(orderDto: CreateOrderDto) {
    const user = await this.saveData(orderDto);
    return user;
  }

  async listing(pipeline: any, params: any) {
    return await this.paginateAggregate(pipeline, params);
  }
 
}
