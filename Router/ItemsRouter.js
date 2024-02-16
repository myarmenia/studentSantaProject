import { Router } from "express";
import itemsController from "../Controller/GiftItemsController.js";
import isAuth from "../Middleware/IsAuth.js";

const itemsRouter = Router();

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
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Items"
 */

itemsRouter.get("/items", isAuth, itemsController.getItems);

export default itemsRouter;
