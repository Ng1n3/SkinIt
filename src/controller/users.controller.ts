import { Request, Response } from "express";
import {
  CreateuserInput,
  EdituserInput,
  SignInUserInput,
} from "../schemas/users.schema";
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getusers,
  signin,
} from "../services/user.service";

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
    const rfTkn = user.generateRefreshToken();

    res.cookie(REFRESH_TOKEN.cookie.name, rfTkn, REFRESH_TOKEN.cookie.options);

    return res.status(200).send({
      success: true,
      user,
      access_token: acTkn,
    });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await getusers();
    return res.status(200).send(users);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function getUserHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const user = await getUser(req.params.id);
    return res.status(200).send(user);
  } catch (error: any) {
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
    res.status(400).send(error.message);
  }
}

export async function deleteUserHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const user = deleteUser(req.params.id);
    res.status(200).send({
      status: "OK",
      message: "user Deleted",
    });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
