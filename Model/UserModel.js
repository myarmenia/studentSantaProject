import { Schema, model } from "mongoose";

const UserModelSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("UserModel", UserModelSchema);

export default UserModel;
