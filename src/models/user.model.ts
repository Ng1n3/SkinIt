import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  const salt = await bcrypt
    .genSalt(Number(process.env.SALT))
    .catch((error: any) => {
      throw new Error("error while salting");
    });
  const hash = await bcrypt.hash(user.password, salt).catch((error: any) => {
    throw new Error("Error while hashing password");
  });

  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error: any) {
    return false;
  }
};

const userModel = mongoose.model<UserDocument>("users", userSchema);

export default userModel;
