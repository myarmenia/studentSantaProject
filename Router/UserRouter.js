import { Router } from "express";
import UserController from "../Controller/UserController.js";

const UserRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication managing APIs
 */

/**
 * @swagger
 *  /api/auth/signup:
 *   post:
 *      summary: User Signup
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *      responses:
 *          200:
 *              description: Success
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref:"#/component/schemas/signup"
 *
 */

UserRouter.post("/signup", UserController.signUp);

/**
 * @swagger
 *  /api/auth/signin:
 *   post:
 *      summary: User Signin
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *      responses:
 *          200:
 *              description: Success
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref:"#/component/schemas/signin"
 *
 */

UserRouter.post("/signin", UserController.signIn);


UserRouter.post("/refresh",UserController.refresh)





/**
 * @swagger
 *  /api/auth/logout:
 *   post:
 *      summary: User Logout
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Success
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref:"#/component/schemas/Logout"
 *
 */

UserRouter.post("/logout", UserController.logout);



export default UserRouter;
