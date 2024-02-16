import { Schema, model } from "mongoose";

const GiftBoxSchema = new Schema(
  {
    name: { type: String },
    img: { type: String },
    price: { type: Number },
    CategoriesId: { type: Schema.Types.ObjectId, ref: "GiftCategories" },
  },
  {
    timestamps: true,
  }
);

const GiftBox = model("GiftBox", GiftBoxSchema);

export default GiftBox;
