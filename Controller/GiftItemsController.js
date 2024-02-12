import itemService from "../Service/GiftItemsService.js";

const itemController = {
  getItems: async (req, res) => {
    try {
      const items = await itemService.getitems();

      res.status(200).send(items);
    } catch (error) {}
  },
};

export default itemController;
