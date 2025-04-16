import { Application } from "express";
import mongoose from "mongoose";

export const connectDB = async (app: Application) => {
  const DB_URI: string | undefined = process.env.DB_URI;
  const PORT: string | undefined = process.env.PORT;

  if (!DB_URI) {
    throw new Error("❌ DB_URI is not defined in the environment variables.");
  }
  try {
    await mongoose.connect(DB_URI, {
      dbName: "Second_Brain_APP",
    });
    console.log(`Database is successfully connected`);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listen on port ${PORT} 🚀🚀`);
    });
  } catch (error) {
    console.log(`Database cannot connected`, error);
    process.exit(1);
  }
};
