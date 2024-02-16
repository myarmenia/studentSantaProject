import { Router } from "express";
import GiftItems from "../Model/GiftItemsModel.js";
import data from "../Data/Data.js";
import GiftCategories from "../Model/GiftCategoriesModel.js";
import GiftBox from "../Model/GiftBoxModel.js";

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
  await GiftCategories.deleteMany({});
  await GiftBox.deleteMany({});

  const seededItems = await GiftItems.insertMany(data);

  //categories seed
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
        giftItemsId: seededItems.find((giftItem, z) => {
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

  const seededCategories = await GiftCategories.insertMany(resArray);
  //categories seed

  //categories Id save item subcatgories
  for (let i = 0; i < seededItems.length; i++) {
    const categories = await GiftCategories.find({
      giftItemsId: seededItems[i]._id,
    });
    // console.log("tvyal categorian",categories);
    for (let index = 0; index < categories.length; index++) {
      seededItems[i].subCategories.unshift(categories[index]._id);
    }
    seededItems[i].subCategories.reverse();
    seededItems[i].save();
  }
  console.log("items", seededItems);

  //categories Id save item subcatgories

  //boxes seed
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

  const seededbox = await GiftBox.insertMany(resArraybox);

  //boxes Id save categories product_range
  for (let i = 0; i < seededCategories.length; i++) {
    const categories = await GiftBox.find({
      CategoriesId: seededCategories[i]._id,
    });
    // console.log("tvyal categorian",categories);
    for (let index = 0; index < categories.length; index++) {
      seededCategories[i].product_range.unshift(categories[index]._id);
      //  console.log(itemsCategories[i]);
    }
    seededCategories[i].product_range.reverse();
    seededCategories[i].save();
  }

  console.log(seededCategories);

  //boxes Id save categories product_range

  //boxes seed
});

export default seedRouter;
