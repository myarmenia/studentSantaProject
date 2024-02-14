import UserModel from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import {generateAccessToken, generateRefreshToken } from "../Utils/Token.js";
import RefreshToken from "../Model/TokenModel.js";

const UserService = {
  signUp: async (email, password) => {
    const signUp = await UserModel.findOne({ email });
    if (!signUp) {
      const newUser = new UserModel({
        email: email,
        password: await bcrypt.hash(password, 10),
      });

      newUser.save();
      return { message: "User Singed Up" };
    } else {
      return { message: "User Registered" };
    }
  },
  signIn: async (email, password) => {
    const signUp = await UserModel.findOne({ email });
    if (!signUp) {
      return { message: "wrong e-mail" };
    }
    if (bcrypt.compareSync(password, signUp.password)) {
      const accessToken = generateAccessToken(signUp);
      const refreshToken=generateRefreshToken(signUp)
      const newToken=new RefreshToken({
        userId:signUp._id,
        token:refreshToken
      })
      newToken.save()
      console.log(newToken);
      return { accessToken: accessToken,refreshToken:refreshToken, message: "Logged In" };
    } else {
      return { message: "wrong password" };
    }
  },
  refresh:async(refreshToken)=>{
    try {
      if(refreshToken){
         const token=await RefreshToken.findOne({token:refreshToken})
      if(!token){
        return {message:"User not logged"}
      }
     await RefreshToken.findOneAndDelete({token:refreshToken})
      const newAccessToken=generateRefreshToken()
      const newRefreshToken=generateAccessToken()
      
      return 
      }else{
        return {message:"not logged in"}
      }
     
    } catch (error) {
      console.error(error)
    }
  },
  logout: async (token, res) => {
    try {
      if (!token) {
        return { message: "User out" };
      } else {
        await res.clearCookies("token");
        return { message: "Logout succesful" };
      }
    } catch (error) {}
  },
};

export default UserService;
