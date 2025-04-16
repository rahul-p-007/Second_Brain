import mongoose, { Document, Schema } from "mongoose";

interface ITags extends Document {
  title: string;
}

const TagsSchema: Schema<ITags> = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});
export const TagsModel = mongoose.model("Tags", TagsSchema);
