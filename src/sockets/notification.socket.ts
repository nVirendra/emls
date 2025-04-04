import { Server, Socket } from 'socket.io';
import {
  addUserSocket,
  removeUserSocket,
  logOnlineUsers,
} from '../utils/socketStore';

export const initNotificationSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      addUserSocket(userId, socket.id);
      console.log(`✅ ${userId} connected with socket ID ${socket.id}`);
      logOnlineUsers();
    }

    socket.on('disconnect', () => {
      if (userId) {
        removeUserSocket(userId);
        console.log(`🔴 ${userId} disconnected`);
        logOnlineUsers();
      }
    });
  });
};

export const sendNotificationToUser = (
  io: Server,
  receiverId: string,
  data: any
) => {
  const socketId = require('../utils/socketStore').getUserSocket(receiverId);

  console.log(`📨 Notifying ${receiverId} → socket: ${socketId}`);

  if (socketId) {
    io.to(socketId).emit('new-notification', data);
  } else {
    console.warn(`⚠️ No socket found for user ${receiverId}`);
  }
};
