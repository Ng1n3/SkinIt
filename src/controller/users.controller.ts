import { Request, Response } from "express";
import { CreateuserInput, EdituserInput } from "../schemas/users.schema";
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getusers,
} from "../services/user.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateuserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(400).send(error.message);
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
