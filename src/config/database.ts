import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};
