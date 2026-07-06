import { Request } from "express";
import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: string;
    }
  }
}

export type AuthenticatedUser = Express.User;

export type FullUser = Omit<PrismaUser, "password">;

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  fullUser?: FullUser;
}