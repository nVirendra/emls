import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { initNotificationSocket } from './sockets/notification.socket';
import { connectDB } from './config/database';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});
initNotificationSocket(io);

export { io };

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
