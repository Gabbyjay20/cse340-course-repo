import "dotenv/config";
import express from "express";

import { showOrganizations } from "./src/controllers/organizationsController.js";
import { showProjects } from "./src/controllers/projectsController.js";
import { showCategories } from "./src/controllers/categoriesController.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home Page"
  });
});

app.get("/organizations", showOrganizations);

app.get("/projects", showProjects);

app.get("/categories", showCategories);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});