import { Router } from "express";
import categoriesController from "../Controller/GiftCategoriesController.js";
import isAuth from "../Middleware/IsAuth.js";

const categoriesRouter = Router();

/**
 * @swagger
 *  /api/categories/{id}:
 *   get:
 *      summary: Return Categories by Items id
 *      tags: [Data]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: by Parent Item Id
 *          required: true
 *          schema:
 *            type: string
 *            format: id
 *      responses:
 *          200:
 *              description: Success
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref:"#/component/schemas/subCategories"
 *
 */

categoriesRouter.get("/:id", isAuth, categoriesController.getCategoriesById);

export default categoriesRouter;
