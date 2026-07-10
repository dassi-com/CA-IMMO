import { prisma } from "../../utils/prisma";
import { parsePagination } from "../../utils/pagination";
import { getIO } from "../../config/socket";
import { NotificationsListQuery } from "./notifications.types";

export const createNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  link?: string
) => {
  const notification = await prisma.notification.create({
    data: { user_id: userId, type, title, message, link },
  });

  try {
    getIO().to(`user:${userId}`).emit("notification", notification);
  } catch {
    console.log("Socket.IO not available, skipping real-time notification");
  }

  return notification;
};

export const getMyNotificationsService = async (
  userId: string,
  query: NotificationsListQuery
) => {
  const { page, limit, skip } = parsePagination(query.page, query.limit);

  const where = { user_id: userId };

  const [total, notifications] = await Promise.all([
    prisma.notification.count({ where }),
    prisma.notification.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    }),
  ]);

  return {
    notifications,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

export const markAsReadService = async (notificationId: string, userId: string) => {
  const notification = await prisma.notification.findFirst({
    where: { id: notificationId, user_id: userId },
  });

  if (!notification) {
    return null;
  }

  return prisma.notification.update({
    where: { id: notificationId },
    data: { is_read: true, read_at: new Date() },
  });
};

export const markAllAsReadService = async (userId: string) => {
  await prisma.notification.updateMany({
    where: { user_id: userId, is_read: false },
    data: { is_read: true },
  });
};

export const getUnreadCountService = async (userId: string) => {
  return prisma.notification.count({
    where: { user_id: userId, is_read: false },
  });
};
