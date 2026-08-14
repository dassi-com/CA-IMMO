import { Request } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import jwt from 'jsonwebtoken';

const isDev = process.env.NODE_ENV === 'development';

const getUserIdFromToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token) as { id?: string } | null;
    if (decoded && decoded.id) return decoded.id;
  } catch {
    return null;
  }

  return null;
};

const getIp = (req: Request): string =>
  ipKeyGenerator(req.ip ?? req.socket.remoteAddress ?? 'unknown');

const keyGenerator = (req: Request): string => {
  const userId = getUserIdFromToken(req);
  if (userId) return `user:${userId}`;

  return getIp(req);
};

export const createApiLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 1000 : 100,
    // Seules les réponses en erreur (>= 400) consomment le quota : les
    // lectures légitimes (propriétés, favoris, notifications) ne bloquent
    // jamais les utilisateurs normaux.
    skipSuccessfulRequests: true,
    message: {
      success: false,
      message: 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator,
  });

export const createAuthLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 100 : 10,
    // Ne comptent que les tentatives échouées : une connexion réussie ne
    // consume pas le quota, les utilisateurs légitimes ne sont plus bloqués.
    skipSuccessfulRequests: true,
    message: {
      success: false,
      message: 'Too many authentication attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => getIp(req),
  });

export const createPasswordResetLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 30 : 3,
    message: {
      success: false,
      message: 'Too many password reset requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => getIp(req),
  });

export const createTokenOpLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 50 : 7,
    message: {
      success: false,
      message: 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => getIp(req),
  });

export const createInquiryLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 200 : 30,
    message: {
      success: false,
      message: 'Too many inquiries, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => getIp(req),
  });
