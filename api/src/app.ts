import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { validateEnv, env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import { swaggerSpec } from "./config/swagger";
import "./config/passport";
import authRouter from "./modules/auth/auth.routes";
import usersRouter from "./modules/users/users.routes";
import propertiesRouter from "./modules/properties/properties.routes";
import inquiriesRouter from "./modules/inquiries/inquiries.routes";
import paymentsRouter from "./modules/payments/payments.routes";
import mediaRouter from "./modules/media/media.routes";
import favoritesRouter from "./modules/favorites/favorites.routes";

validateEnv();

const app: Application = express();

// ─── Security ─────────────────────────────────
app.use(helmet());
const corsOrigin = env.clientUrl;
if (!corsOrigin && process.env.NODE_ENV === "production") {
  console.warn("CLIENT_URL is not set. CORS will be restrictive.");
}
app.use(
  cors({
    origin: corsOrigin || false,
    credentials: true,
  })
);

// ─── Rate Limiting ────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Auth endpoints : limite stricte contre le brute-force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many authentication attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/v1/auth/login", authLimiter);
app.use("/api/v1/auth/register", authLimiter);
app.use("/api/v1/auth/refresh", authLimiter);

// ─── Parsing & Compression ────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(compression());

// ─── Logging ──────────────────────────────────
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Swagger ──────────────────────────────────
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Immo Platform API Docs",
    customCss: ".swagger-ui .topbar { display: none }",
    swaggerOptions: {
      persistAuthorization: true, // garde le token JWT entre les requêtes
    },
  })
);

// ─── Health Check ─────────────────────────────
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    docs: `/api/docs`,
  });
});

// ─── Routes ───────────────────────────────────
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/properties", propertiesRouter);
app.use("/api/v1/inquiries", inquiriesRouter);
app.use("/api/v1/payments", paymentsRouter);
app.use("/api/v1/properties", mediaRouter);
app.use("/api/v1/favorites", favoritesRouter);

// ─── 404 Handler ──────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────
app.use(errorMiddleware);

export default app;