import { Schema } from 'mongoose';
import { ENUM } from '../common/enum';
export interface IAdminSession extends Document {
  adminId: string;
  status: number;
  ipAddress?: string;
  deviceToken?: string;
}

export const AdminSessionSchema = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, required: true, index: true, ref: ENUM.COLLECTIONS.ADMIN },
    status: { type: Schema.Types.Number, default: ENUM.USER_PROFILE_STATUS.ACTIVE },
    ipAddress: { type: Schema.Types.String },
    deviceToken: { type: Schema.Types.String },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.ADMIN_SESSION,
  }
);
