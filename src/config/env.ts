import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  MONGO_URI: process.env.MONGO_URI as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
};
