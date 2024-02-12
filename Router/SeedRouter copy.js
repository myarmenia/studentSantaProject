import { Router } from "express";
import GiftItems from "../Model/GiftItemsModel.js";
import data from "../Data/Data.js";
import GiftCategoriesModel from "../Model/GiftCategoriesModel.js";
import GiftBoxModel from "../Model/GiftBoxModel.js";

const seedRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Seed
 *  description: Data save MongoDB
 */

/**
 * @swagger
 *  /api/seed/:
 *    get:
 *      summary: Save all MongoDB
 *      tags: [Seed]
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Seed"
 */

seedRouter.get("/seed", async (req, res) => {
  await GiftItems.deleteMany({});
  await GiftCategoriesModel.deleteMany({});
  await GiftBoxModel.deleteMany({});

  const itemsloop = data.map((prod) => {
    const dataitem = {
      title: prod.title,
      description: prod.description,
      img: prod.img,
      // subCategories:prod.subcategories
    };

    return dataitem;
  });

  const seededGiftItems = await GiftItems.insertMany(itemsloop);

  // categories save mongoDB
  let result;
  let resArray = [];
  const productsloop = data.map((product) => {
    const titelsArrayloop = product.subcategories.map((getItems, i) => {
      return getItems.title;
    });

    result = titelsArrayloop.map((prod, i) => {
      const titelsArray = product.subcategories.map((getItems, i) => {
        return getItems;
      });
      const daat = {
        giftItemsId: seededGiftItems.find((giftItem, z) => {
          return giftItem.title === product.title;
        })._id,
        title: titelsArray[i].title,
        img: titelsArray[i].img,
      };

      return daat;
    });

    return result;
  });

  for (let index = 0; index < productsloop.length; index++) {
    if (Array.isArray(productsloop[index])) {
      for (let i = 0; i < productsloop[index].length; i++) {
        resArray.push(productsloop[index][i]);
      }
    }
  }
  //  categories save mongoDB
  const seededCategories = await GiftCategoriesModel.insertMany(resArray);

  //boxes save mongoDb
  let resArraycategories = [];
  let resArraybox = [];
  let resultbox;
  const productsCategories = data.map((prod) => {
    return prod.subcategories;
  });

  for (let index = 0; index < productsCategories.length; index++) {
    if (Array.isArray(productsCategories[index])) {
      for (let i = 0; i < productsCategories[index].length; i++) {
        resArraycategories.push(productsCategories[index][i]);
      }
    }
  }

  const categoriesloop = resArraycategories.map((product) => {
    const titelsArrayloop = product.product_range.map((getItems, i) => {
      return getItems.title;
    });

    resultbox = titelsArrayloop.map((prod, i) => {
      const titelsArray = product.product_range.map((getItems, i) => {
        return getItems;
      });
      const daat = {
        CategoriesId: seededCategories.find((giftItem, z) => {
          return giftItem.title === product.title;
        })._id,
        name: titelsArray[i].name,
        img: titelsArray[i].img,
        price: titelsArray[i].price,
      };
      return daat;
    });

    return resultbox;
  });

  for (let index = 0; index < categoriesloop.length; index++) {
    if (Array.isArray(categoriesloop[index])) {
      for (let i = 0; i < categoriesloop[index].length; i++) {
        resArraybox.push(categoriesloop[index][i]);
      }
    }
  }

  const seededbox = await GiftBoxModel.insertMany(resArraybox);

  seededGiftItems.map((items, i) => {
    const resultboxes = seededCategories.filter((Categor) => {
      return items._id === Categor.giftItemsId;
    });
    resultboxes.map((cate, i) => {
      items.subCategories.push(cate._id);
    });
  });

  seededCategories.map((items, i) => {
    const resultboxes = seededbox.filter((Categor) => {
      return items._id === Categor.CategoriesId;
    });
    resultboxes.map((cate, i) => {
      items.product_range.push(cate._id);
    });
  });

  res.status(200).send(seededGiftItems);
});

export default seedRouter;
