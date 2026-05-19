import { Router } from "express";
import { authenticate } from "../../middlewares/auth.midlleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} from "./favorites.controller";
import { propertyIdParamValidator } from "./favorites.validator";

const router = Router();

router.get("/", authenticate, getFavorites);

router.post(
  "/:propertyId",
  authenticate,
  validate(propertyIdParamValidator),
  addFavorite
);

router.delete(
  "/:propertyId",
  authenticate,
  validate(propertyIdParamValidator),
  removeFavorite
);

router.get(
  "/:propertyId/check",
  authenticate,
  validate(propertyIdParamValidator),
  checkFavorite
);

export default router;