import mongoose, { Schema } from "mongoose";

export interface UserInput {
  email: string;
  password: string;
  name?: string;
}

export interface EditUserInput {
  email?: string;
  password?: string;
  name?: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<UserDocument>("users", userSchema);

export default userModel;
