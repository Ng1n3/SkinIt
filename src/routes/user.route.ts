import { Router } from "express";
import validateUser from "../middleware/validate.user";
import { createUserSchema, editUserSchema, signinUserSchema } from "../schemas/users.schema";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getUserHandler,
  getUsersHandler,
  siginUserHandler,
} from "../controller/users.controller";
import checkAuthentication from "../middleware/auth.check";
import cacheMiddleware from "../middleware/cache";

const userRouter = Router();

userRouter.post("/signup", validateUser(createUserSchema), createUserHandler);

userRouter.post('/signin', validateUser(signinUserSchema), siginUserHandler)

userRouter.get("/users",  cacheMiddleware('users'), checkAuthentication, getUsersHandler);

userRouter.get("/user/:id",  cacheMiddleware('user'), checkAuthentication, getUserHandler);

userRouter.put("/user/:id", checkAuthentication, validateUser(editUserSchema), editUserHandler);

userRouter.delete("/user/:id", checkAuthentication, deleteUserHandler);


export default userRouter;