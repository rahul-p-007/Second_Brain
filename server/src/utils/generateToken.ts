import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const SECRET_KEY: string = process.env.SECRET_KEY as string;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export const generateToken = (userId: Types.ObjectId, res: Response) => {
  const token = jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
  return token;
};
