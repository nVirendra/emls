import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { initNotificationSocket } from './sockets/notification.socket';
import { connectDB } from './config/database';

const server = http.createServer(app); // Create HTTP server from Express

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// 👇 Initialize sockets BEFORE server starts listening
initNotificationSocket(io);
export { io };

const PORT = process.env.PORT || 5000;

// ⛳️ Correct: Use `server.listen`, not `app.listen`
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
