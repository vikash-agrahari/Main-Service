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
  wrongOtpCount: number;
  wrongVerifyTimer: Date;
  resendOtpCount: number;
  title: string;
}

export const AdminSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    mobileNo: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.ADMIN,
  }
);
