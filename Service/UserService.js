import UserModel from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../Utils/Token.js";

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
      const token = generateToken(signUp);

      return { token: token, message: "Logged In" };
    } else {
      return { message: "wrong password" };
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
