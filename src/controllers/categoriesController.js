import { getAllCategories } from "../models/categories.js";

const showCategories = async (req, res) => {
  const categories = await getAllCategories();

  res.render("categories", {
    title: "Service Project Categories",
    categories
  });
};

export { showCategories };