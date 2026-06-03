import express from "express";
import { body } from "express-validator";

import {
  showOrganizations,
  showOrganizationDetails
} from "./controllers/organizationsController.js";

import {
  showProjects,
  showProjectDetails,
  showAssignCategoriesForm,
  saveProjectCategories
} from "./controllers/projectsController.js";

import {
  showCategories,
  showCategoryDetails,
  showNewCategoryForm,
  createNewCategory,
  showEditCategoryForm,
  updateExistingCategory
} from "./controllers/categoriesController.js";

const router = express.Router();

const categoryValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters.")
];

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page"
  });
});

router.get("/organizations", showOrganizations);
router.get("/organization/:id", showOrganizationDetails);

router.get("/projects", showProjects);
router.get("/project/:id", showProjectDetails);

router.get("/assign-categories/:projectId", showAssignCategoriesForm);
router.post("/assign-categories/:projectId", saveProjectCategories);

router.get("/categories", showCategories);
router.get("/category/:id", showCategoryDetails);

router.get("/new-category", showNewCategoryForm);
router.post("/new-category", categoryValidationRules, createNewCategory);

router.get("/edit-category/:id", showEditCategoryForm);
router.post("/edit-category/:id", categoryValidationRules, updateExistingCategory);

export default router;