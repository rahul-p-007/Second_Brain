import mongoose, { Document, Types, Schema } from "mongoose";
const contentType = ["image", "video", "article", "audio"];

export interface Icontent extends Document {
  link: string;
  titles: string;
  types: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
}

const ContentSchema: Schema<Icontent> = new Schema({
  link: {
    type: String,
  },
  titles: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    required: true,
    enum: contentType,
  },
  tags: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tags",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export const ContentModel = mongoose.model<Icontent>("Contents", ContentSchema);
