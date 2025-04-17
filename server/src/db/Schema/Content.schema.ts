import mongoose, { Document, Types, Schema } from "mongoose";
const contentType = [
  "image",
  "video",
  "article",
  "audio",
  "document",
  "youtube",
  "tweet",
];

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

  // Change with video

  // tags: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "Tags",
  //   required: true,
  // },
  tags: {
    type: [String],
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export const ContentModel = mongoose.model<Icontent>("Contents", ContentSchema);
