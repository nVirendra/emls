import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { User } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';

export interface AuthRequest extends Request {
  user?: any;
}

// ✅ Remove explicit type `: RequestHandler`
export const authenticate = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, ENV.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
);
