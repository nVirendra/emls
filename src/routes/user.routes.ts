import express from 'express';
import {
  getUserProfile,
  followUser,
  unfollowUser,
  searchUsers,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', searchUsers); // GET /api/users?search=xyz
router.get('/:id', getUserProfile);
router.post('/:id/follow', followUser);
router.post('/:id/unfollow', unfollowUser);

export default router;
