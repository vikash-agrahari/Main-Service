import  mongoose, { ObjectId } from 'mongoose';
import { ENUM } from 'src/common/enum';


export interface ITransaction extends Document {
	orderId: ObjectId;
	clientId: ObjectId
	amount: number;
	status: number;
	transactionDate: Date;
	webhookResponses: Array<any>;
	lastWebhookResponse: any;
	chargeId: string;
}

export const TransactionSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: ENUM.COLLECTIONS.ORDER},
	transactionDate: {type: Date,default: Date.now,},
	clientId: {type: mongoose.Schema.Types.ObjectId,required: true,ref: ENUM.COLLECTIONS.USER},
	amount: {type: mongoose.Schema.Types.Number,required: true},
	status: {type: mongoose.Schema.Types.Number,enum: Object.values(ENUM.TRANSACTION_STATUS),default: ENUM.TRANSACTION_STATUS.PENDING},
	webhookResponses: {type: [mongoose.Schema.Types.Mixed],default: []},
	lastWebhookResponse: {type: mongoose.Schema.Types.Mixed,default: {}},
	chargeId: {type: mongoose.Schema.Types.String},
	},
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.TRANSACTION,
  },
);
