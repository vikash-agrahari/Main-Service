import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';

export interface IUser extends Document {
  fullName: string;
  email: string;
  mobileNo: number;
  password: string;
}

export const UserSchema = new mongoose.Schema(
  {
    fullName: { type: Schema.Types.String },
    email: { type: Schema.Types.String, required: true, unique: true },
    mobileNo: { type: Schema.Types.String },
    password: { type: Schema.Types.String },
    status: {
      type: Schema.Types.Number,
      default: ENUM.USER_PROFILE_STATUS.ACTIVE,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER,
  },
);
