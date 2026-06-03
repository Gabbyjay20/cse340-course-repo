import { validationResult } from "express-validator";

import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  createCategory,
  updateCategory
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

const showNewCategoryForm = (req, res) => {
  res.render("new-category", {
    title: "New Category",
    errors: [],
    category: {}
  });
};

const createNewCategory = async (req, res) => {
  const errors = validationResult(req);

  const category = {
    name: req.body.name
  };

  if (!errors.isEmpty()) {
    return res.render("new-category", {
      title: "New Category",
      errors: errors.array(),
      category
    });
  }

  await createCategory(category.name);

  req.flash("success", "Category created successfully.");
  res.redirect("/categories");
};

const showEditCategoryForm = async (req, res) => {
  const category = await getCategoryById(req.params.id);

  res.render("edit-category", {
    title: "Edit Category",
    errors: [],
    category
  });
};

const updateExistingCategory = async (req, res) => {
  const errors = validationResult(req);

  const category = {
    category_id: req.params.id,
    name: req.body.name
  };

  if (!errors.isEmpty()) {
    return res.render("edit-category", {
      title: "Edit Category",
      errors: errors.array(),
      category
    });
  }

  await updateCategory(req.params.id, category.name);

  req.flash("success", "Category updated successfully.");
  res.redirect("/categories");
};

export {
  showCategories,
  showCategoryDetails,
  showNewCategoryForm,
  createNewCategory,
  showEditCategoryForm,
  updateExistingCategory
};