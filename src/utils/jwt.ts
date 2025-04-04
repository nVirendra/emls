// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: '1d' });
};

export const decodeToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as { userId: string };
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};
