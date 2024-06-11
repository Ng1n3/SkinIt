import { NextFunction, Request, Response } from "express";

// check user role
export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.role !== role) {
      return res.status(403).send({ error: "Access Denied" });
    }
    next();
  };
};

// ownership of account
export const checkOwnerShip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body?._id;
  const targetUserId = req.params.id;

  if (userId !== targetUserId) {
    return res.status(403).send({ error: "Access Denied" });
  }
  next();
};
