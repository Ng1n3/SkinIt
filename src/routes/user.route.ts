import { Router } from "express";
import validateResource from "../middleware/validate.resource.middleware";
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
import checkAuthentication from "../middleware/auth.check.middleware";
import cacheMiddleware from "../middleware/cache.middleware";
import { checkOwnerShip, checkRole } from "../middleware/auth.role.middleware";

const userRouter = Router();

userRouter.post(
  "/signup",
  validateResource(createUserSchema),
  createUserHandler
);

userRouter.post(
  "/signin",
  validateResource(signinUserSchema),
  siginUserHandler
);

userRouter.get(
  "/users",
  checkAuthentication,
  cacheMiddleware("users"),
  getUsersHandler
);

userRouter.get(
  "/user/:id",
  checkAuthentication,
  cacheMiddleware("user"),
  getUserHandler
);

userRouter.put(
  "/user/:id",
  checkAuthentication,
  validateResource(editUserSchema),
  checkOwnerShip,
  editUserHandler
);

userRouter.delete(
  "/user/:id",
  checkOwnerShip,
  checkAuthentication,
  deleteUserHandler
);

userRouter.post(
  "/forgot-password",
  validateResource(forgotPasswordEmailSchema),
  checkRole("admin"),
  forgotPasswordHandler
);

userRouter.post(
  "/reset-password/:id",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

export default userRouter;
