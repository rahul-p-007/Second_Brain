import { Response, Request } from "express";
import { Types } from "mongoose";
import { userModel } from "../db/Schema/User.schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

const passwordSchema = z
  .string()
  .min(5, "At-least 5 character")
  .max(14, "At-most 14 character")
  .regex(/[A-Z]/, "At-least one uppercase character")
  .regex(/[a-z]/, "At-least one lowercase character")
  .regex(/\d/, "At-least one numberic character");

const ValidateUserInput = z.object({
  name: z.string().min(2).max(15),
  email: z.string().email(),
  password: passwordSchema,
});
type UserInputType = z.infer<typeof ValidateUserInput>;

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password }: UserInputType = req.body;
    if (!name || !email || !password) {
      return res.json(411).json({
        success: false,
        message: "Enter all credentials",
      });
    }
    const checkUserExist = await userModel.findOne({ email });
    if (checkUserExist) {
      return res.status(403).json({
        success: false,
        message: "User is already exist || Login ",
      });
    }

    const CheckUserInput = ValidateUserInput.safeParse({
      email,
      name,
      password,
    });
    if (!CheckUserInput.success) {
      return res.status(411).json({
        success: false,
        message: "Enter correct fields",
        error: CheckUserInput.error.errors[0].message,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const User = await userModel.create({
      email,
      name,
      password: hashPassword,
    });
    // Generate JWT Token and set it as a cookie
    // Ensure User._id is treated as an ObjectId

    generateToken(User._id as Types.ObjectId, res);

    // if (User._id instanceof Types.ObjectId) {
    //     generateToken(User._id, res);
    //   } else {
    //     throw new Error("User ID is not a valid ObjectId.");
    //   }
    return res.json({
      success: true,
      message: "Account created successfully",
      User,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: "Unknown error occur",
      });
    }
  }
};
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: UserInputType = req.body;
    if (!email || !password) {
      return res.status(411).json({
        success: false,
        message: "Enter your All credentials",
      });
    }
    const ExistingUser = await userModel.findOne({ email });
    if (!ExistingUser) {
      return res.status(403).json({
        success: false,
        message: "User is not exist || SignIN ",
      });
    }
    const comparePassword = await bcrypt.compare(
      password,
      ExistingUser.password
    );
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }
    generateToken(ExistingUser._id as Types.ObjectId, res);
    return res.status(200).json({
      success: true,
      message: "You successfully login 🤩",
      userData: ExistingUser,
    });
  } catch (error: unknown) {
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

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    return res.json({
      success: true,
      message: "logout Successfully",
    });
  } catch (error: unknown) {
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
