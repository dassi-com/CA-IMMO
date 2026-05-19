import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "./error.middleware";
import { AuthenticatedRequest, AuthenticatedUser } from "../types";
import { asyncHandler } from "../utils/asyncHandler";

export const authenticate = asyncHandler(
  async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.jwtSecret) as AuthenticatedUser;
    req.user = decoded;

    next();
  }
);