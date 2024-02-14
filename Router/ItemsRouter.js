import { Router } from "express";
import itemController from "../Controller/GiftItemsController.js";
import isAuth from "../Middleware/IsAuth.js";

const itemRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Data
 *  description: Items managing APIs
 */

/**
 * @swagger
 *  /api/get/items:
 *    get:
 *      summary: Items
 *      tags: [Data]
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Items"
 */

itemRouter.get("/items",isAuth,itemController.getItems);

export default itemRouter;
