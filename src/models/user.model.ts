import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.AUTH_ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.AUTH_ACCESS_TOKEN_EXPIRY;

const REFRESH_TOKEN_SECRET = process.env.AUTH_REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = process.env.AUTH_REFRESH_TOKEN_EXPIRY;


if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET)
  throw new Error("Some secrets are missing");

const RESET_PASSWORD_TOKEN_EXPIRY =
  process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS;

export interface UserInput {
  email: string;
  password: string;
  name?: string;
  tokens?: { token: string }[];
}

export interface EditUserInput {
  email?: string;
  password?: string;
  name?: string;
}

export interface SigninUserInputs {
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    tokens: [
      {
        token: { required: true, type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    const { name, email } = ret;

    return { name, email };
  },
});

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error.message);
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return Jwt.sign(
    {
      _id: this._id.toString(),
      name: this.name,
      email: this.email,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  const refreshToken = Jwt.sign(
    {
      _id: this._id.toString(),
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );

  const rtHash = await bcrypt.hash(refreshToken, Number(process.env.SALT));

  this.tokens?.push({ token: rtHash });
  await this.save();
  return refreshToken;
};

const userModel = mongoose.model<UserDocument>("users", userSchema);

export default userModel;
