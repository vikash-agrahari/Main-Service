import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';


export interface ILog extends Document {
    request: any;
    response: any;
    url:string
   
  }

export const LogSchema = new mongoose.Schema(
  {
    request: { type: Schema.Types.Mixed, required: true },
    response: { type: Schema.Types.Mixed, required: true },
    url: { type: Schema.Types.String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.LOG,
  },
);
