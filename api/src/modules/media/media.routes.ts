import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { upload } from "../../config/multer";
import {
  uploadImages,
  deleteImage,
  reorderImages,
  getPropertyImages,
} from "./media.controller";
import {
  propertyIdValidator,
  imageIdValidator,
  reorderImagesValidator,
} from "./media.validator";

const router = Router();

// ─── Route publique ────────────────────────────────────────────────────────
router.get(
  "/:propertyId/images",
  validate(propertyIdValidator),
  getPropertyImages
);

// ─── Routes Owner ──────────────────────────────────────────────────────────
router.post(
  "/:propertyId/images",
  authenticate,
  authorize("OWNER"),
  validate(propertyIdValidator),
  upload.array("images", 10), // ← multer middleware
  uploadImages
);

router.delete(
  "/:propertyId/images/:imageId",
  authenticate,
  authorize("OWNER"),
  validate(imageIdValidator),
  deleteImage
);

router.patch(
  "/:propertyId/images/reorder",
  authenticate,
  authorize("OWNER"),
  validate(reorderImagesValidator),
  reorderImages
);

export default router;