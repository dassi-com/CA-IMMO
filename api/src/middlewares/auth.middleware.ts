import { Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import { env } from "../config/env";
import { AppError } from "./error.middleware";
import { AuthenticatedRequest, AuthenticatedUser } from "../types";

export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret) as AuthenticatedUser;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, is_suspended: true },
    });

    if (!user || user.is_suspended) {
      throw new AppError("Unauthorized", 401);
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new AppError("Token expired", 401));
    } else if (error instanceof JsonWebTokenError) {
      next(new AppError("Invalid token", 401));
    } else {
      next(error);
    }
  }
};
