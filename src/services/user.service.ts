import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

import userModel, {
  EditUserInput,
  SigninUserInputs,
  UserInput,
} from "../models/user.model";
import transporter from "../utils/nodemailer";
dotenv.config();

const REFRESH_TOKEN_SECRET = process.env.AUTH_REFRESH_TOKEN_SECRET as string;

if (!REFRESH_TOKEN_SECRET) throw new Error("some secrets are missing");
interface getUsersOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function createUser(input: UserInput) {
  try {
    const checkUser = await userModel.findOne({ email: input.email });
    if (checkUser)
      throw new Error("User already exists, please login or use another email");
    const user = await userModel.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signin(input: SigninUserInputs) {
  try {
    const user = await userModel.findOne({ email: input.email });
    if (!user) throw new Error("user does not exist");
    const isValid = await user.comparePassword(input.password);
    if (!isValid) throw new Error("password incorrect");
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getusers(options: getUsersOptions) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "asc",
    } = options;

    const skip = (page - 1) * limit;

    const users = await userModel
      .find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalUsers = await userModel.countDocuments();

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUser(id: string) {
  try {
    const user = await userModel.findById(id);
    if (!user) throw new Error("user not found");

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function editUser(input: EditUserInput, id: string) {
  try {
    const userId = await userModel.findById(id);
    if (!userId) throw new Error("User not found");
    const user = await userModel.findByIdAndUpdate(id, input);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteUser(id: string) {
  try {
    await userModel.findByIdAndDelete(id);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function forgotPassword(email: string) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User with given email does not exist");

    const resetToken = await user.generateResetToken();

    const resetUrl = `http://localhost:3020/reset-password/${resetToken}`;

    const messgae = `
    <h1>Password Reset</h1>
    <p>You requested a password reset</p>
    <p>Click this <a href="${resetUrl}" target="_blank">link</a> to reset your password</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Password Reset",
      html: messgae,
    });

    return { message: "password reset email sent", resetToken };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function resetpassword(
  token: string,
  email: string,
  newPassword: string
) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("Invalid or expirted password reset token");
    await user.resetPassword(token, newPassword);

    return { message: "Password reset Succesfull" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function regenerateAccessTokenService(
  refreshToken: string,
  id: string
) {
  try {
    const user = await userModel.findById(id);
    if (!user) throw new Error("user not found");
    // Jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const newAccessToken = await user.regenerateAccessToken(refreshToken);
    return { newAccessToken };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
