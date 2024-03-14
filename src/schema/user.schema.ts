import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: number;
  password: string;
}


export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    mobileNo: { type: Schema.Types.String, required: true,unique:true, },
    password: { type: Schema.Types.String, required: true },
    tapId: { type: Schema.Types.String },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER,
  },
);
