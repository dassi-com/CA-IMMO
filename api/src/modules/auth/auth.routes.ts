import { Router, Request, Response, NextFunction } from "express";
import { register, login, refresh, logout, getMe, googleCallback } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  registerValidator,
  loginValidator,
  refreshValidator,
} from "./auth.validator";
import passport from "../../config/passport";
import { env } from "../../config/env";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Créer un compte
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: Compte créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthTokens'
 *       409:
 *         description: Email ou téléphone déjà utilisé
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post("/register", validate(registerValidator), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Se connecter
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthTokens'
 *       401:
 *         description: Email ou mot de passe incorrect
 *       403:
 *         description: Compte suspendu
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post("/login", validate(loginValidator), login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Rafraîchir l'access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshDto'
 *     responses:
 *       200:
 *         description: Token rafraîchi avec succès
 *       401:
 *         description: Refresh token invalide ou expiré
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post("/refresh", validate(refreshValidator), refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Se déconnecter
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshDto'
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Refresh token invalide
 */
router.post("/logout", validate(refreshValidator), logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtenir le profil connecté
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/me", authenticate, getMe);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authentifier avec Google
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirection vers Google OAuth
 */
router.get("/google", passport.authenticate("google", { session: false, scope: ["profile", "email"] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback Google OAuth
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirection vers le frontend avec les tokens
 */
router.get(
  "/google/callback",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { session: false }, (err: unknown, user: unknown) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect(`${env.clientUrl}/login?error=authentication_failed`);
      }
      (req as any).user = user;
      next();
    })(req, res, next);
  },
  googleCallback
);

export default router;