import { Schema } from 'mongoose';
import { ENUM } from '../common/enum';
export interface IUserSession extends Document {
  userId: string;
  status: number;
  firebaseData: IFirebaseData;
}
export interface IFirebaseData {
  emailToken: string;
  googleToken?: string;
  phoneToken?: string;
}

const firebaseData = new Schema<IFirebaseData>(
  {
    emailToken: { type: Schema.Types.String },
    googleToken: { type: Schema.Types.String },
    phoneToken: { type: Schema.Types.String },
  },
  {
    _id: false,
  },
);

export const UserSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true, ref: ENUM.COLLECTIONS.USER },
    status: { type: Schema.Types.Number, default: ENUM.USER_PROFILE_STATUS.ACTIVE },
    firebaseData: { type: firebaseData },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER_SESSION,
  }
);
