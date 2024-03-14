import { Injectable } from '@nestjs/common';
import { ENUM } from 'src/common/enum';
import { OrderListing } from './interface/order-management.interface';
import { OrderListingDto } from './dto/order-management.dto';
import { OrderEntity } from 'src/entity/order.entity';

@Injectable()
export class OrderManagementService {
  constructor(private readonly orderEntity: OrderEntity) {}

  async orderListing(orderListingDto: OrderListingDto) {
    const options: OrderListing = orderListingDto;
    const pipeline = [];
   
    pipeline.push({
      $project: {
        _id: '$_id',
        clientId: '$clientId',
        orderId: '$orderId',
        productId: '$productId',
        transactionId: '$transactionId',
        amount: '$amount',
        paymentMethod: '$paymentMethod',
        status: '$status',
        createdAt: '$createdAt',
      },
    })
     pipeline.push({ $sort: { createdAt: -1 } });
    options.getCount = true;
    return await this.orderEntity.listing(pipeline, options);
  }


 
}
