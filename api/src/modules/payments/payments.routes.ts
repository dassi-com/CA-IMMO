import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  initiatePayment,
  handleWebhook,
  confirmPaymentManually,
  getMyPayments,
  listPayments,
  getPayment,
} from "./payments.controller";
import {
  initiatePaymentValidator,
  paymentIdValidator,
  paymentsListValidator,
  confirmPaymentValidator,
} from "./payments.validator";

const router = Router();

// ─── Webhook Flutterwave (pas d'auth — appelé par Flutterwave) ─────────────
router.post("/webhook", handleWebhook);

// ─── Routes Owner ──────────────────────────────────────────────────────────
router.post(
  "/initiate",
  authenticate,
  authorize("OWNER"),
  validate(initiatePaymentValidator),
  initiatePayment
);
router.get(
  "/my",
  authenticate,
  authorize("OWNER"),
  validate(paymentsListValidator),
  getMyPayments
);

// ─── Routes Owner + Admin ──────────────────────────────────────────────────
router.get(
  "/:id",
  authenticate,
  authorize("OWNER", "ADMIN"),
  validate(paymentIdValidator),
  getPayment
);

// ─── Routes Admin ──────────────────────────────────────────────────────────
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(paymentsListValidator),
  listPayments
);
router.patch(
  "/:id/confirm",
  authenticate,
  authorize("ADMIN"),
  validate(confirmPaymentValidator),
  confirmPaymentManually
);

export default router;