import { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    title: { type: String },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", CartSchema);

export default Cart;
