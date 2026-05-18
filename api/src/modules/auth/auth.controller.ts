import { Response } from "express";
import { AuthenticatedRequest } from "../../types";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/response";
import { env } from "../../config/env";
import {
  registerService,
  loginService,
  refreshTokenService,
  logoutService,
  getMeService,
  generateAuthTokens,
} from "./auth.service";
import { RegisterDto, LoginDto } from "./auth.types";
import { User } from "@prisma/client";

export const register = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const dto = req.body as RegisterDto;
    const tokens = await registerService(dto);

    sendSuccess(res, tokens, "Account created successfully", 201);
  }
);

export const login = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const dto = req.body as LoginDto;
    const tokens = await loginService(dto);

    sendSuccess(res, tokens, "Login successful");
  }
);

export const refresh = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { refreshToken } = req.body as { refreshToken: string };
    const tokens = await refreshTokenService(refreshToken);

    sendSuccess(res, tokens, "Token refreshed successfully");
  }
);

export const logout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { refreshToken } = req.body as { refreshToken: string };
    await logoutService(refreshToken);

    sendSuccess(res, null, "Logged out successfully");
  }
);

export const getMe = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = await getMeService(req.user!.id);

    sendSuccess(res, user, "Profile fetched successfully");
  }
);

export const googleCallback = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as User;
    const tokens = await generateAuthTokens(user);

    const redirectUrl = `${env.clientUrl}/auth/google/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
    res.redirect(redirectUrl);
  }
);