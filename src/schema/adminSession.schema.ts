/**
 * @file admin_session.model
 * @description defines schema for admin session model
 * @author Tap Team
 */

import { Schema, SchemaTypes } from 'mongoose';
import { ENUM } from '../common/enum';
export interface IAdminSession extends Document {
  adminId: string;
  status: number;
  ipAddress?: string;
  deviceToken?: string;
}

export const AdminSessionSchema = new Schema(
  {
    adminId: { type: SchemaTypes.ObjectId, required: true, index: true, ref: ENUM.COLLECTIONS.ADMIN },
    status: { type: SchemaTypes.Number, default: ENUM.CLIENT_PROFILE_STATUS.ACTIVE },
    ipAddress: { type: SchemaTypes.String },
    deviceToken: { type: SchemaTypes.String },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.ADMIN_SESSION,
  }
);
