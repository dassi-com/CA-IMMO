import { Response, NextFunction } from "express";
import { prisma } from "../utils/prisma";
import { AppError } from "./error.middleware";
import { AuthenticatedRequest } from "../types";

export const attachUser = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user?.id) {
    throw new AppError("Not authenticated", 401);
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    omit: { password: true },
  });

  if (!fullUser) {
    throw new AppError("User not found", 404);
  }

  if (fullUser.is_suspended) {
    throw new AppError("Your account has been suspended", 403);
  }

  req.fullUser = fullUser;

  next();
};
