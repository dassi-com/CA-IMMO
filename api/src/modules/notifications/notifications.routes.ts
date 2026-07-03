import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} from "./notifications.controller";

const router = Router();

router.get("/", authenticate, getMyNotifications);
router.get("/unread-count", authenticate, getUnreadCount);
router.patch("/:id/read", authenticate, markAsRead);
router.patch("/read-all", authenticate, markAllAsRead);

export default router;
