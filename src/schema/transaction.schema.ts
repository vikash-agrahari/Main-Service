import  mongoose, {ObjectId} from 'mongoose';
import { ENUM } from 'src/common/enum';


export interface ITransaction extends Document {
  transactionId: string;
	bookingId: string;
	amount: number;
	status: string;
	transactionDate: Date;
	webhookResponses: Array<any>;
	lastWebhookResponse: any;
	chargeId: string;
	tapId: string;
}

export const TransactionSchema = new mongoose.Schema(
  {
		transactionId: {
			type: String,
		},
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: ENUM.COLLECTIONS.ORDER},
		transactionDate: {
			type: Date,
			default: Date.now,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			//ref: ENUM.COLLECTIONS.TRANSACTION
		},
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: ENUM.COLLECTIONS.CLIENT
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(ENUM.TRANSACTION_STATUS),
			default: ENUM.TRANSACTION_STATUS.PENDING,
		},
		webhookResponses: {
			type: [mongoose.Schema.Types.Mixed],
			default: [],
		},
		lastWebhookResponse: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},
		chargeId: String,
		tapId: String,
	},
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.TRANSACTION,
  },
);
