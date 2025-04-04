import express from 'express';
import Notification from '../models/Notification';
import { io } from '../server';
import { sendNotificationToUser } from '../sockets/notification.socket';
const router = express.Router();

router.post('/', async (req, res) => {
  const { senderId, receiverId, postId } = req.body;

  const notification = await Notification.create({
    senderId,
    receiverId,
    type: 'like',
    postId,
  });

  sendNotificationToUser(io, receiverId, notification);
  console.log(' after notification');
  res.status(201).json(notification);
});

router.get('/:userId', async (req, res) => {
  const notifications = await Notification.find({
    receiverId: req.params.userId,
  }).sort({ createdAt: -1 });
  res.json(notifications);
});

router.put('/read/:userId', async (req, res) => {
  await Notification.updateMany(
    { receiverId: req.params.userId },
    { read: true }
  );
  res.json({ success: true });
});

export default router;
