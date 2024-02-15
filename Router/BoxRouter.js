import { Router } from "express";
import boxController from "../Controller/GiftBoxController.js";
import isAuth from "../Middleware/IsAuth.js";

const boxRouter = Router();

/**
 * @swagger
 *  /api/boxes/{id}:
 *   get:
 *      summary: Return Boxes by Parent Categories Id
 *      tags: [Data]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: by Parent Categories Id
 *          required: true
 *          schema:
 *            type: string
 *            format: id
 *      responses:
 *          200:
 *              description: Succes
 *              contents:
 *                  application/json:
 *                      schema:
 *                          $ref:"#/component/schemas/product_range"
 *
 */

boxRouter.get("/:id",isAuth, boxController.getBoxesById);

export default boxRouter;
