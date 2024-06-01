import { Router } from "express";
import validateUser from "../middleware/validate.user";
import { createUserSchema, editUserSchema } from "../schemas/users.schema";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getUserHandler,
  getUsersHandler,
} from "../controller/users.controller";

const userRouter = Router();

userRouter.post("/signup", validateUser(createUserSchema), createUserHandler);

userRouter.get("/users", getUsersHandler);

userRouter.get("/user/:id", getUserHandler);

userRouter.put("/user/:id", validateUser(editUserSchema), editUserHandler);

userRouter.delete("/user/:id", deleteUserHandler);

export default userRouter;
