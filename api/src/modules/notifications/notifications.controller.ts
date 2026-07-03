import { Response } from "express";
import { AuthenticatedRequest } from "../../types";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../../utils/response";
import {
  getMyNotificationsService,
  markAsReadService,
  markAllAsReadService,
  getUnreadCountService,
} from "./notifications.service";
import { NotificationsListQuery } from "./notifications.types";

export const getMyNotifications = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const query = req.query as NotificationsListQuery;
    const result = await getMyNotificationsService(req.user!.id, query);
    sendPaginated(res, result.notifications, result.meta, "Notifications fetched successfully");
  }
);

export const markAsRead = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const notification = await markAsReadService(req.params.id as string, req.user!.id);
    if (!notification) {
      res.status(404).json({ success: false, message: "Notification not found" });
      return;
    }
    sendSuccess(res, notification, "Notification marked as read");
  }
);

export const markAllAsRead = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    await markAllAsReadService(req.user!.id);
    sendSuccess(res, null, "All notifications marked as read");
  }
);

export const getUnreadCount = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const count = await getUnreadCountService(req.user!.id);
    sendSuccess(res, { count }, "Unread count fetched");
  }
);
