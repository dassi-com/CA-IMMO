import { Router } from "express";
import { authenticate } from "../../middlewares/auth.midlleware";
import { authorize } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createInquiry,
  getMyInquiries,
  getInquiry,
  listInquiries,
  deleteInquiry,
} from "./inquieries.controller";
import {
  createInquiryValidator,
  inquiryIdValidator,
  propertyIdParamValidator,
  inquiriesListValidator,
} from "./inquieries.validator";

const router = Router();

// ─── Route publique (connecté ou non) ─────────────────────────────────────
router.post(
  "/:propertyId",
  validate([...propertyIdParamValidator, ...createInquiryValidator]),
  createInquiry
);

// ─── Routes Owner ──────────────────────────────────────────────────────────
router.get(
  "/my/received",
  authenticate,
  authorize("OWNER"),
  validate(inquiriesListValidator),
  getMyInquiries
);

// ─── Routes Owner + Admin ──────────────────────────────────────────────────
router.get(
  "/:id",
  authenticate,
  authorize("OWNER", "ADMIN"),
  validate(inquiryIdValidator),
  getInquiry
);

// ─── Routes Admin ──────────────────────────────────────────────────────────
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(inquiriesListValidator),
  listInquiries
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(inquiryIdValidator),
  deleteInquiry
);

export default router;