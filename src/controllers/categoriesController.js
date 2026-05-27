import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId
} from "../models/categories.js";

const showCategories = async (req, res) => {
  const categories = await getAllCategories();

  res.render("categories", {
    title: "Service Project Categories",
    categories
  });
};

const showCategoryDetails = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryById(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);

  res.render("category", {
    title: category.name,
    category,
    projects
  });
};

export { showCategories, showCategoryDetails };