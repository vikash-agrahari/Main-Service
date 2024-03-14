import { Injectable } from '@nestjs/common';
import { RESPONSE_DATA } from 'src/common/responses';
import { ConfigService } from '@nestjs/config';
import { OrderEntity } from 'src/entity/order.entity';
import { UserOnBoardingService } from '../../user/on-boarding/on-boarding.service'
import { TransactionService } from '../../payment/transaction/transaction.service'
import { OrderDto } from './dto/order.dto';
import { generateRef } from 'src/common/utils';

@Injectable()
export class OrderService {
	constructor(
		private readonly orderEntity: OrderEntity,
		private config: ConfigService,
		private readonly userOnBoardingService: UserOnBoardingService,
		private readonly transactionService: TransactionService,
	) {
	}



	async createOrder(orderDto: OrderDto, sessionData: any) {
		try {
			const orderId = generateRef('ORD');
			const transactionId = generateRef('TRN');
			let userDetails: any = await this.userOnBoardingService.userDetails(sessionData.userId);
			const order = {
				clientId: sessionData.userId,
				orderId: orderId,
				productId: orderDto.productId,
				transactionId: transactionId,
				amount: orderDto.amount,
			};

			const defaultOrderDetails = await this.orderEntity.create(order);

			const transaction = {
				amount: orderDto.amount,
				orderId: defaultOrderDetails._id,
				transactionId: transactionId,
				productId: orderDto.productId,
				clientId: sessionData.userId,
				tapId: userDetails.tapId,
			};
			const defaultTransactionDetails = await this.transactionService.initiateOrder(transaction);
			const payload = {
				customer: {
					id: userDetails.tapId,
				},
				paymentReference: {
					transactionId: defaultTransactionDetails._id,
					orderId: defaultOrderDetails._id,
				},
				amount: 500,
				paymentMetaData: {
					clientId: sessionData.userId,
					transactionId: defaultTransactionDetails._id,
					productId: orderDto.productId,
					orderId: defaultOrderDetails._id,
				},
				postURL: 'process.env.TAP_PAYMENT_WEBHOOK',
			};
			return [RESPONSE_DATA.SUCCESS, { paymentData: payload }];

		} catch (err) {
			throw err;
		}
	}

	async updateOrderByTransactionId(payload: any, data: any) {
		try {
			const defaultOrderDetails = await this.orderEntity.findOneAndUpdate({ _id: payload.transactionId }, data);
			return defaultOrderDetails;
		} catch (err) {
			throw err;
		}
	}





}
