import express from 'express';
import {
  createPost,
  getFeedPosts,
  likePost,
  commentOnPost,
  getUserPosts,
} from '../controllers/post.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/', authenticate, upload.single('file'), createPost);
router.get('/feed', authenticate, getFeedPosts);
router.put('/like/:id', authenticate, likePost);
router.post('/comment/:id', authenticate, commentOnPost);

router.get('/user/:userId', getUserPosts);

export default router;
