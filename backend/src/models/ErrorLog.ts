import { Schema, model, Document } from "mongoose";

export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  route?: string;
  method?: string;
  meta?: Record<string, any>;
}

const errorLogSchema = new Schema<IErrorLog>(
  {
    message: { type: String, required: true },
    stack: { type: String },
    route: { type: String },
    method: { type: String },
    meta: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export default model<IErrorLog>("ErrorLog", errorLogSchema);
