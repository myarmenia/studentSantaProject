import userService from "../Service/UserService.js";

const userController = {
  signUp: async (req, res) => {
    try {
      const { email, password } = req.body;
      const signUpUSer = await userService.signUp(email, password);
      res.status(201).send(signUpUSer);
    } catch (error) {
      console.error(error)
    }
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
    } catch (error) {
      console.error(error)
    }
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
      
      const tokenBearer =await req.headers.authorization.split(' ')[0];
      const token=tokenBearer.split(" ")[1]
      //   const token = req.cookies.token;
      console.log(token);
        const logoutuser = await userService.logout(token, res);

      res.status(200).send(logoutuser);
    } catch (error) {
      console.error(error)
    }
  },
};

export default userController;
