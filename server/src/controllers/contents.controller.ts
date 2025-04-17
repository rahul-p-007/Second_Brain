import { Response, Request } from "express";
import { ContentModel, Icontent } from "../db/Schema/Content.schema";
import mongoose from "mongoose";
import { CustomRequest } from "../middleware/auth.middleware";
const ShouldThisTypes = ["document", "tweet", "youtube", "link"];
export const addnewContent = async (req: CustomRequest, res: Response) => {
  try {
    const { types, link, titles, tags } = req.body as Icontent;
    if (!types || !link || !titles || !tags) {
      return res.status(400).json({
        success: false,
        message: "Enter all the fields",
      });
    }

    if (!ShouldThisTypes.includes(types)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Please use a valid type.",
      });
    }

    const ContentData = await ContentModel.create({
      types,
      link,
      titles,
      tags,
      userId: req.user._id,
    });
    return res.status(200).json({
      success: true,
      message: "Successful submited 🎉🎊🎉",
      data: ContentData,
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
export const getallcontent = async (req: Request, res: Response) => {
  try {
    const cData = await ContentModel.find();
    return res.json({
      success: true,
      message: "All Contents",
      data: cData,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server error",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server error",
        error: "Undefined Error",
      });
    }
  }
};
export const deletecontent = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Content not Found",
    });
  }
  try {
    await ContentModel.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Succesfully deleted ",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server error",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server error",
        error: "Undefined Error",
      });
    }
  }
};
export const updatecontent = async (req: Request, res: Response) => {
  const { id } = req.params as any;
  const updatedcontent = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Content does not find",
    });
  }
  try {
    const updatedData = await ContentModel.findOneAndUpdate(
      { _id: id },
      updatedcontent,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: updatedData,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server error",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server error",
        error: "Undefined Error",
      });
    }
  }
};
