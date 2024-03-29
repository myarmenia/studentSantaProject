import GiftCategories from "../Model/GiftCategoriesModel.js";

const categoriesService = {
  getCategoriesById: async (itemId) => {
    try {
      const itemsCategories = await GiftCategories.find({
        giftItemsId: itemId,
      }).populate("product_range");
      return itemsCategories;
    } catch (error) {
      console.error({ message: "Categories not found" });
    }
  },
};

export default categoriesService;
