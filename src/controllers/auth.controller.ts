import { Request, Response } from 'express';
import { IUser, User } from '../models/User';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'Email already registered' });
    return;
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user._id.toString());

  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = (await User.findOne({ email })) as IUser;

  if (!user || !(await user.comparePassword(password))) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(user._id.toString());

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      followers: user.followers.map((f) => f._id),
      following: user.following.map((f) => f._id),
    },
  });
};
