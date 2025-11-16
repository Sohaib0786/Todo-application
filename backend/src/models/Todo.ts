import { Schema, model, Types, Document } from "mongoose";

export interface ITodo extends Document {
  user: Types.ObjectId;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

export default model<ITodo>("Todo", todoSchema);
