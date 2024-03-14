import  mongoose, {ObjectId} from 'mongoose';
import { ENUM } from 'src/common/enum';


export interface IOrder extends Document {
    _id: string;
	clientId: string;
	orderId: string;
	productId: string;
	transactionId: string;
	amount: number;
	paymentMethod: any;
	status: number;
}

export const OrderSchema = new mongoose.Schema(
    {
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: ENUM.COLLECTIONS.USER
		},
		orderId: { type: String },
        productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			//ref: ENUM.COLLECTIONS.TRANSACTION
		},
		transactionId: {
			type: String 
		},
		amount: {
			type: Number,
			default: 0,
		},
		paymentMethod: {
			type: Object,
		},
		status: {
			type: Number,
			enum: Object.values(ENUM.ORDER_STATUS),
			default: ENUM.ORDER_STATUS.PENDING,
		},
	},
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.ORDER,
  },
);
