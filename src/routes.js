import express from "express";
import { body } from "express-validator";

import {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  showDashboard,
  logoutUser
} from "./controllers/authController.js";

import { showUsers } from "./controllers/usersController.js";

import {
  requireLogin,
  requireRole
} from "./middleware/auth.js";

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

const registerValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters.")
];

const loginValidationRules = [
  body("email").isEmail().withMessage("Valid email is required."),
  body("password").notEmpty().withMessage("Password is required.")
];

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

/* AUTH */

router.get("/register", showRegisterForm);
router.post("/register", registerValidationRules, registerUser);

router.get("/login", showLoginForm);
router.post("/login", loginValidationRules, loginUser);

router.get("/dashboard", requireLogin, showDashboard);

router.post("/logout", logoutUser);

/* ADMIN USERS PAGE */

router.get("/users", requireLogin, requireRole("admin"), showUsers);

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