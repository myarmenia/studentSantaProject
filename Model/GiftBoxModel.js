import { Schema, model } from "mongoose";

const GiftBoxSchema = new Schema(
  {
    name: { type: String },
    img: { type: String },
    price: { type: Number },
    CategoriesId: { type: Schema.Types.ObjectId, ref: "GiftCategoriesModel" },
  },
  {
    timestamps: true,
  }
);

const GiftBoxModel = model("GiftBox", GiftBoxSchema);

export default GiftBoxModel;
