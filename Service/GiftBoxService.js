import GiftBox from "../Model/GiftBoxModel.js";

const giftBoxService = {
  getBoxesById: async (id) => {
    try {
      const boxes = await GiftBox.find({ CategoriesId: id });
      return boxes;
    } catch (error) {
      console.error({ message: "Boxes not found" });
    }
  },
};

export default giftBoxService;
