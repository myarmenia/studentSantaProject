import GiftBoxModel from "../Model/GiftBoxModel.js";

const GiftBoxService = {
  getBoxesById: async (id) => {
    try {
      const boxes = await GiftBoxModel.find({ CategoriesId: id });
      return boxes;
    } catch (error) {
      console.error({ message: "Boxes not found" });
    }
  },
};

export default GiftBoxService;
