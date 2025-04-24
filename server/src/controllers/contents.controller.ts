import { Response, Request } from "express";
import { ContentModel, Icontent } from "../db/Schema/Content.schema";
import mongoose from "mongoose";
import { CustomRequest } from "../middleware/auth.middleware";
import { LinkModel } from "../db/Schema/Link.schema";
import { random } from "../utils/Random";
import { userModel } from "../db/Schema/User.schema";
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

export const getUserContent = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID not found in request",
    });
  }

  try {
    const content = await ContentModel.find({ userId: userId }).populate(
      "userId",
      "name"
    );

    return res.json({
      success: true,
      content,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Unknown error occurred",
      });
    }
  }
};
export const share = async (req: CustomRequest, res: Response) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.user._id,
    });

    if (existingLink) {
      return res.json({
        success: true,
        message: "/share/" + existingLink.hash,
      });
    }

    const hash = random(10);
    await LinkModel.create({
      userId: req.user._id,
      hash: hash,
    });

    return res.json({
      success: true,
      message: "/share/" + hash,
    });
  } else {
    await LinkModel.deleteOne({
      userId: req.user._id,
    });

    return res.json({
      success: true,
      message: "Deleted sharable link",
    });
  }
};

export const shareLink = async (req: Request, res: Response) => {
  const { hash } = req.params;
  console.log("hash", hash);

  const link = await LinkModel.findOne({
    hash,
  });
  console.log(link);
  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input",
    });
    return;
  }
  console.log("userId from link:", link.userId);

  const content = await ContentModel.find({
    userId: link.userId,
  });
  const user = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(link.userId),
  });
  if (!user) {
    res.status(411).json({
      message: "user not found",
    });
    return;
  }
  res.json({
    username: user.name,
    content: content,
  });
};
