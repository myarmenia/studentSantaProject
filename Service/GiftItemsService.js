import GiftItems from "../Model/GiftItemsModel.js";

const itemService = {
  getitems: async () => {
    try {
      let items = await GiftItems.find().populate({
        path: "subCategories",
        populate: {
          path: "product_range",
          select: "name img price",
        },
      });

      return items;
    } catch (error) {}
  },
};

export default itemService;
