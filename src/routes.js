import express from "express";
import { body } from "express-validator";

import {
  showOrganizations,
  showOrganizationDetails,
  showNewOrganizationForm,
  createNewOrganization,
  showEditOrganizationForm,
  updateExistingOrganization
} from "./controllers/organizationsController.js";

import {
  showProjects,
  showProjectDetails,
  showNewProjectForm,
  createNewProject,
  showEditProjectForm,
  updateExistingProject,
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

const organizationValidationRules = [
  body("name").trim().notEmpty().withMessage("Organization name is required."),
  body("description").trim().notEmpty().withMessage("Description is required."),
  body("contact_email").isEmail().withMessage("Valid email is required."),
  body("logo_filename").trim().notEmpty().withMessage("Logo filename is required.")
];

const projectValidationRules = [
  body("organization_id").notEmpty().withMessage("Organization is required."),
  body("title").trim().notEmpty().withMessage("Project title is required."),
  body("description").trim().notEmpty().withMessage("Description is required."),
  body("location").trim().notEmpty().withMessage("Location is required."),
  body("project_date").notEmpty().withMessage("Project date is required.")
];

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

/* ORGANIZATIONS */

router.get("/organizations", showOrganizations);
router.get("/organization/:id", showOrganizationDetails);

router.get("/new-organization", showNewOrganizationForm);
router.post("/new-organization", organizationValidationRules, createNewOrganization);

router.get("/edit-organization/:id", showEditOrganizationForm);
router.post("/edit-organization/:id", organizationValidationRules, updateExistingOrganization);

/* PROJECTS */

router.get("/projects", showProjects);
router.get("/project/:id", showProjectDetails);

router.get("/new-project", showNewProjectForm);
router.post("/new-project", projectValidationRules, createNewProject);

router.get("/edit-project/:id", showEditProjectForm);
router.post("/edit-project/:id", projectValidationRules, updateExistingProject);

router.get("/assign-categories/:projectId", showAssignCategoriesForm);
router.post("/assign-categories/:projectId", saveProjectCategories);

/* CATEGORIES */

router.get("/categories", showCategories);
router.get("/category/:id", showCategoryDetails);

router.get("/new-category", showNewCategoryForm);
router.post("/new-category", categoryValidationRules, createNewCategory);

router.get("/edit-category/:id", showEditCategoryForm);
router.post("/edit-category/:id", categoryValidationRules, updateExistingCategory);

export default router;