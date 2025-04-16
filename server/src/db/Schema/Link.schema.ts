import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILink extends Document {
  hash: string;
  userId: Types.ObjectId;
}
const LinkSchema: Schema<ILink> = new Schema({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});
export const LinkModel = mongoose.model<ILink>("Link", LinkSchema);
