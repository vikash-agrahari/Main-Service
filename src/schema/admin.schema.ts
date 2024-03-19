import { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';

export interface IAdmin extends Document {
  name: string;
  email: string;
  mobileNo: number;
  password: string;
  otp: {
    otp: string;
    expiry: Date;
    isVerified: boolean;
  };
}

export const AdminSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    mobileNo: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    otp: {
      otp: { type: Schema.Types.String, required: true },
      expiry: { type: Schema.Types.Date, required: false },
      isVerified: { type: Schema.Types.Boolean, required: true, default: false },
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.ADMIN,
  }
);
