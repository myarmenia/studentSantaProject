import { Schema, model } from "mongoose";

const GiftCategoriesSchema = new Schema(
  {
    title: { type: String },
    img: { type: String },
    price: { type: Number },
    product_range: [{ type: Schema.Types.ObjectId, ref: "GiftBox" }],
    giftItemsId: { type: Schema.Types.ObjectId, ref: "GiftItems" },
  },
  {
    timestamps: true,
  }
);

const GiftCategoriesModel = model("GiftCategoriesModel", GiftCategoriesSchema);

export default GiftCategoriesModel;
