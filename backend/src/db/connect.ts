import mongoose from "mongoose";

export const connectDB = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
