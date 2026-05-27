import express from "express";

import {
  showOrganizations,
  showOrganizationDetails
} from "./controllers/organizationsController.js";

import {
  showProjects,
  showProjectDetails
} from "./controllers/projectsController.js";

import {
  showCategories,
  showCategoryDetails
} from "./controllers/categoriesController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page"
  });
});

router.get("/organizations", showOrganizations);
router.get("/organization/:id", showOrganizationDetails);

router.get("/projects", showProjects);
router.get("/project/:id", showProjectDetails);

router.get("/categories", showCategories);
router.get("/category/:id", showCategoryDetails);

export default router;