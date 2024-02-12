import { Schema, model } from "mongoose";

const GiftItemsSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    img: { type: String },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "GiftCategoriesModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GiftItems = model("GiftItems", GiftItemsSchema);

export default GiftItems;
