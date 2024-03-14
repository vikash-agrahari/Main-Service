/**
 * @file user_session.model
 * @description defines schema for user session model
 * @author TAP POC Team
 */

import { Schema, SchemaTypes } from 'mongoose';
import { ENUM } from '../common/enum';
export interface IUserSession extends Document {
  clientId: string;
  status: number;
}

export const UserSessionSchema = new Schema(
  {
    clientId: { type: SchemaTypes.ObjectId, required: true, index: true, ref: ENUM.COLLECTIONS.USER },
    status: { type: SchemaTypes.Number, default: ENUM.USER_PROFILE_STATUS.ACTIVE },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER_SESSION,
  }
);
