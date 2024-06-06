import { Router } from "express";
import validateUser from "../middleware/validate.user";
import {
  createUserSchema,
  editUserSchema,
  forgotPasswordEmailSchema,
  resetPasswordSchema,
  signinUserSchema,
} from "../schemas/users.schema";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  forgotPasswordHandler,
  getUserHandler,
  getUsersHandler,
  resetPasswordHandler,
  siginUserHandler,
} from "../controller/users.controller";
import checkAuthentication from "../middleware/auth.check";
import cacheMiddleware from "../middleware/cache";

const userRouter = Router();

userRouter.post("/signup", validateUser(createUserSchema), createUserHandler);

userRouter.post("/signin", validateUser(signinUserSchema), siginUserHandler);

userRouter.get(
  "/users",
  checkAuthentication,
  cacheMiddleware("users"),
  getUsersHandler
);

userRouter.get(
  "/user/:id",
  cacheMiddleware("user"),
  checkAuthentication,
  getUserHandler
);

userRouter.put(
  "/user/:id",
  checkAuthentication,
  validateUser(editUserSchema),
  editUserHandler
);

userRouter.delete("/user/:id", checkAuthentication, deleteUserHandler);

userRouter.post(
  "/forgot-password",
  validateUser(forgotPasswordEmailSchema),
  forgotPasswordHandler
);

userRouter.post(
  "/reset-password/:id",
  validateUser(resetPasswordSchema),
  resetPasswordHandler
);

export default userRouter;