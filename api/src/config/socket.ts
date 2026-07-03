import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { env } from './env';

let io: SocketServer | null = null;

export const initSocket = (server: HttpServer): SocketServer => {
  const corsOrigins = env.clientUrl
    ? env.clientUrl.split(',').map((s: string) => s.trim())
    : ['http://localhost:3000'];

  io = new SocketServer(server, {
    cors: {
      origin: corsOrigins,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join', (userId: string) => {
      socket.join(`user:${userId}`);
      console.log(`Socket ${socket.id} joined user:${userId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): SocketServer => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
