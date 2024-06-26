import { Request, Response } from "express";
import {
  CreateuserInput,
  EdituserInput,
  SignInUserInput,
  ForgotPasswordEmailInput,
  ResetPasswordInput,
} from "../schemas/users.schema";
import {
  createUser,
  deleteUser,
  editUser,
  forgotPassword,
  getUser,
  getusers,
  regenerateAccessTokenService,
  resetpassword,
  signin,
} from "../services/user.service";
import redisClient from "../utils/redisClient";
import logger from "../utils/logger";
import userModel from "../models/user.model";

const DEFAULT_EXPIRATION = Number(process.env.CACHING_DEFAULT_EXPIRATION);

const REFRESH_TOKEN = {
  secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  cookie: {
    name: "refreshTkn",
    options: {
      samesite: "None",
      secure: true,
      httponly: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
};
export async function createUserHandler(
  req: Request<{}, {}, CreateuserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    const acTkn = user.generateAccessToken();
    const rfTkn = user.generateRefreshToken();

    res.cookie(REFRESH_TOKEN.cookie.name, rfTkn, REFRESH_TOKEN.cookie.options);
    return res.status(201).send({
      success: true,
      user,
      access_Token: acTkn,
    });
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send(error.message);
  }
}

export async function siginUserHandler(
  req: Request<{}, {}, SignInUserInput["body"]>,
  res: Response
) {
  try {
    const user = await signin(req.body);
    const acTkn = user.generateAccessToken();
    const rfTkn = await user.generateRefreshToken();
    console.log("refreshToken: ", rfTkn)

    res.cookie(REFRESH_TOKEN.cookie.name, rfTkn, REFRESH_TOKEN.cookie.options);

    return res.status(200).send({
      success: true,
      user,
      access_token: acTkn,
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const options = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc",
    };

    const users = await getusers(options);
    if (res.locals.cacheKey) {
      await redisClient.set(res.locals.cacheKey, JSON.stringify(users), {
        EX: DEFAULT_EXPIRATION,
      });
    }
    return res.status(200).send(users);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(400).send(error.message);
  }
}

export async function getUserHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const user = await getUser(req.params.id);
    if (res.locals.cacheKey) {
      await redisClient.set(res.locals.cacheKey, JSON.stringify(user), {
        EX: DEFAULT_EXPIRATION,
      });
    }
    return res.status(200).send(user);
  } catch (error: any) {
    logger.error(error.message);
    res.status(404).send(error.message);
  }
}

export async function editUserHandler(
  req: Request<{ id: string }, {}, EdituserInput["body"]>,
  res: Response
) {
  try {
    const user = await editUser(req.body, req.params.id);
    res.status(200).send(user);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}

export async function deleteUserHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const user = deleteUser(req.params.id);
    res.status(204).send({
      status: "OK",
      message: "user Deleted",
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordEmailInput["body"]>,
  res: Response
) {
  try {
    const { email } = req.body;
    const reponse = await forgotPassword(email);
    res.status(200).send(reponse);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send({ error: error.message });
  }
}

export async function resetPasswordHandler(
  req: Request<{ id: string }, {}, ResetPasswordInput["body"]>,
  res: Response
) {
  try {
    const { token, email, newPassword } = req.body;
    const response = await resetpassword(token, email, newPassword);
    return res.status(200).send(response);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send({ error: error.message });
  }
}

export async function regenerateAccessTokenHanlder(
  req: Request<{ id: string }, {}, { refreshToken: string }>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { refreshToken } = req.body;
    
    if (!refreshToken)
      return res.status(400).send({ error: "refresh Token required" });

    const newAccessToken = await regenerateAccessTokenService(refreshToken, id);

    return res.status(201).send({
      success: true,
      newAccessToken,
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send({ error: error.message });
  }
}
