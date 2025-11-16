import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  password: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
