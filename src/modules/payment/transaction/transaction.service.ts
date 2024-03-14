import { Injectable } from '@nestjs/common';
import { RESPONSE_DATA } from 'src/common/responses';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { LogEntity } from 'src/entity/log.entity';
import { TransactionEntity } from 'src/entity/transaction.entity';
import { ENUM } from 'src/common/enum';

@Injectable()
export class TransactionService {
	constructor(
		private readonly logEntity: LogEntity,
		private config: ConfigService,
		private readonly transactionEntity: TransactionEntity) {
	}

	async initiateOrder(payload: any) {
		try {
			const defaultOrderDetails = await this.transactionEntity.create(payload);
			return defaultOrderDetails;
		} catch (err) {
			throw err;
		}
	}

	async findTransaction(payload: any) {
		try {
			const defaultOrderDetails = await this.transactionEntity.getTransactionDetails(payload);
			return defaultOrderDetails;
		} catch (err) {
			throw err;
		}
	}

	async updateTransaction(payload: any, data: any) {
		try {
			const defaultOrderDetails = await this.transactionEntity.findOneAndUpdate({ _id: payload.transactionId }, data);
			return defaultOrderDetails;
		} catch (err) {
			throw err;
		}
	}

}
