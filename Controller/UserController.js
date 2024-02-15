import RefreshToken from "../Model/TokenModel.js";
import UserService from "../Service/UserService.js";

const UserController = {
  signUp: async (req, res) => {
    try {
      const { email, password } = req.body;
      const signUpUSer = await UserService.signUp(email, password);
      res.status(201).send(signUpUSer);
    } catch (error) {}
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const signInUser = await UserService.signIn(email, password);

      // res.cookie("token", signInUser.token, {
      //   httpOnly: true,
      //   sameSite: "strict",
      //   // secure: true
      // });

      res.status(201).send(signInUser);
    } catch (error) {}
  },
  refresh: async (req, res) => {
    try {
      const { refreshToken, email } = req.body;

      const token = await UserService.refresh(refreshToken, email);
      res.send(token);
    } catch (error) {
      console.error(error);
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.headers.authorization.split("=")[1];
      //   const token = req.cookies.token;

      //   const logoutuser = await UserService.logout(token, res);

      res.status(200).send(logoutuser);
    } catch (error) {}
  },
};

export default UserController;
