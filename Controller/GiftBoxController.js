import giftBoxService from "../Service/GiftBoxService.js";

const boxController = {
  getBoxesById: async (req, res) => {
    try {
      const { id } = req.params;

      const boxes = await giftBoxService.getBoxesById(id);

      res.status(200).send(boxes);
    } catch (error) {
      console.error({ message: "Boxes not found" });
    }
  },
};

export default boxController;
