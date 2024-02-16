import mongoose, { connect } from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
    return true;
  } catch (error) {
    console.error("DB Not Connected", error);
    return false;
  }
};

export default connection;
