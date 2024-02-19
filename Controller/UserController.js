import RefreshToken from "../Model/TokenModel.js";
import userService from "../Service/UserService.js";

const userController = {
  signUp: async (req, res) => {
    try {
      const { email, password } = req.body;
      const signUpUSer = await userService.signUp(email, password);
      res.status(201).send(signUpUSer);
    } catch (error) {}
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const signInUser = await userService.signIn(email, password);

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
      const { refreshToken } = req.body;

      const token = await userService.refresh(refreshToken);
      
      res.status(200).send(token);
    } catch (error) {
      console.error(error);
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.headers.authorization.split("=")[1];
      //   const token = req.cookies.token;

      //   const logoutuser = await userService.logout(token, res);

      res.status(200).send(logoutuser);
    } catch (error) {}
  },
};

export default userController;
