import { Request, Response } from "express";
import { CreateuserInput } from "../schemas/users.schema";
import { createUser } from "../services/user.service";

export async function createUserHandler(req:Request<{},{}, CreateuserInput["body"]>, res: Response, ) {
  try {
    const user = await createUser(req.body)
    return res.status(200).send(user);
    return 
  } catch (error:any) {
    return res.status(400).send(error.message)
  } 
}