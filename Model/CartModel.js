import { Schema, model } from "mongoose";

const CartCategories = new Schema(
  {
    title: { type: String },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const CartCategoriesModel = model("CartCategoriesModel", CartCategories);

export default CartCategoriesModel;
