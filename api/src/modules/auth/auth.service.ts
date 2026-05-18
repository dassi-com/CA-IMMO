import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../../utils/prisma";
import { AppError } from "../../middlewares/error.middleware";
import { env } from "../../config/env";
import {
  RegisterDto,
  LoginDto,
  TokenPayload,
  AuthTokens,
} from "./auth.types";
import { User } from "@prisma/client";

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

// ─── Token Helpers ────────────────────────────────────────────────────────────

const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateRefreshToken = (): string => {
  return crypto.randomBytes(64).toString("hex");
};

const generateAuthTokens = async (user: User): Promise<AuthTokens> => {
  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken();

  // Stocker le refresh token en base
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN_MS),
    },
  });

  return { accessToken, refreshToken };
};

// ─── Service Methods ──────────────────────────────────────────────────────────

export const registerService = async (dto: RegisterDto): Promise<AuthTokens> => {
  // Vérifier si l'email existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  // Vérifier si le téléphone existe déjà
  const existingPhone = await prisma.user.findUnique({
    where: { phone: dto.phone },
  });

  if (existingPhone) {
    throw new AppError("Phone number already in use", 409);
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      full_name: dto.full_name,
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
      role: dto.role ?? "TENANT",
    },
  });

  return generateAuthTokens(user);
};

export const loginService = async (dto: LoginDto): Promise<AuthTokens> => {
  // Trouver l'utilisateur
  const user = await prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Vérifier si le compte est suspendu
  if (user.is_suspended) {
    throw new AppError("Your account has been suspended", 403);
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(dto.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return generateAuthTokens(user);
};

export const refreshTokenService = async (
  token: string
): Promise<{ accessToken: string }> => {
  // Chercher le refresh token en base
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!storedToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  // Vérifier l'expiration
  if (storedToken.expires_at < new Date()) {
    // Supprimer le token expiré
    await prisma.refreshToken.delete({ where: { token } });
    throw new AppError("Refresh token expired, please login again", 401);
  }

  // Vérifier si l'utilisateur est suspendu
  if (storedToken.user.is_suspended) {
    throw new AppError("Your account has been suspended", 403);
  }

  // Générer un nouveau access token
  const accessToken = generateAccessToken({
    id: storedToken.user.id,
    email: storedToken.user.email,
    role: storedToken.user.role,
  });

  return { accessToken };
};

export const logoutService = async (token: string): Promise<void> => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (!storedToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  await prisma.refreshToken.delete({ where: { token } });
};

export const getMeService = async (
  userId: string
): Promise<Omit<User, "password">> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};