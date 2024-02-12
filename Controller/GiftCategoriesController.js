import categoriesService from "../Service/GiftCategoriesService.js";

const categoriesController = {
  getCategoriesById: async (req, res) => {
    try {
      const { id } = req.params;

      const categories = await categoriesService.getCategoriesById(id);

      res.status(200).send(categories);
    } catch (error) {
      console.error({ message: "Categories not found" });
    }
  },
};

export default categoriesController;
