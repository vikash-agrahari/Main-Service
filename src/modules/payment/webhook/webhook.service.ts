import { Injectable } from '@nestjs/common';
import { WebhookDto } from './dto/webhook.dto';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA } from 'src/common/responses';
import { GuardService } from 'src/guards/guards.service';
import { CONSTANT } from 'src/common/constant';
import { ConfigService } from '@nestjs/config';
import { OrderEntity } from 'src/entity/order.entity';
import { TransactionService } from '../transaction/transaction.service';
import { OrderService } from '../order/order.service';


@Injectable()
export class WebhookService {
  constructor(
    private readonly guardService: GuardService,
    private readonly orderEntity: OrderEntity,
		private config: ConfigService,
		private readonly transactionService: TransactionService,
    private readonly orderService: OrderService,
  ) { }

  
  async webhook(payload: any) {
		try {
			const result = await this.transactionService.updateTransaction(
				{transactionId:payload.metadata.transactionId},
				{
					$set: {
						lastWebhookResponse: payload,
						status: payload.status,
						chargeId: payload.id,
					},
					$push: {
						webhookResponses: payload,
					},
				},
			);
			const query = { transactionId: payload.metadata.transactionId };
			const orderPayload = {
				status: ENUM.ORDER_STATUS.CAPTURED,
				paymentMethod: payload.source,
			};

			await this.orderService.updateOrderByTransactionId(query, orderPayload);
			if (result.status === ENUM.TRANSACTION_STATUS.CAPTURED) {
				//TODO update product sku and quantity  as per business requirement
			}
      return [RESPONSE_DATA.SUCCESS, {}];

		} catch (err) {
			console.log('Error in webhook:---------->', err);
      return [RESPONSE_DATA.ERROR, {}];
		}
	}
 
}
