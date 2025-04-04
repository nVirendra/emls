import { Request, Response } from 'express';
import { User } from '../models/User';
import { decodeToken } from '../utils/jwt';

export const searchUsers = async (req: Request, res: Response) => {
  const keyword = req.query.search
    ? {
        name: { $regex: req.query.search, $options: 'i' }, // case-insensitive match
      }
    : {};

  try {
    const users = await User.find(keyword).select('name _id'); // only fetch necessary fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', '_id')
      .populate('following', '_id');

    if (!user) return res.status(404).send('User not found');

    const isFollowing = req.user
      ? user.followers.some((f) => f._id.toString() === req.user._id)
      : false;

    res.json({ ...user.toObject(), isFollowing });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const decoded = decodeToken(token);

    if (!decoded) return res.status(401).json({ message: 'Invalid token' });

    const currentUserId = decoded.userId;

    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser)
      return res.status(404).send('User not found');

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      currentUser.following.push(req.params.id);
      await userToFollow.save();
      await currentUser.save();
    }
    console.log('follow user');
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const decoded = decodeToken(token);

    if (!decoded) return res.status(401).json({ message: 'Invalid token' });

    const currentUserId = decoded.userId;
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser)
      return res.status(404).send('User not found');

    userToUnfollow.followers.pull(currentUserId);
    currentUser.following.pull(req.params.id);
    await userToUnfollow.save();
    await currentUser.save();
    console.log('unfollow user');
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
