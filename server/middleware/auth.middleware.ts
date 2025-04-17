import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../src/db/Schema/User.schema";

interface CustomRequest extends Request {
  cookies: {
    token?: string;
    [key: string]: any;
  };
  user?: any;
}
const SECRET: string | undefined = process.env.SECRET_KEY as string;

export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - no Token provided",
      });
    }

    const decoded = jwt.verify(token, SECRET) as any;
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - token is invalid",
      });
    }

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Interval Server error",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Interval Server error",
        error: "Unknow Error",
      });
    }
  }
};
