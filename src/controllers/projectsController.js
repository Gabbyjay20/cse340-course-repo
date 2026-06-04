import { validationResult } from "express-validator";

import {
  getAllProjects,
  getProjectById,
  getCategoriesByProjectId,
  getAllCategoriesForAssignment,
  createProject,
  updateProject,
  updateProjectCategories
} from "../models/projects.js";

import { getAllOrganizations } from "../models/organizations.js";

const showProjects = async (req, res) => {
  const projects = await getAllProjects();

  res.render("projects", {
    title: "Projects",
    projects
  });
};

const showProjectDetails = async (req, res) => {
  const projectId = req.params.id;

  const project = await getProjectById(projectId);
  const categories = await getCategoriesByProjectId(projectId);

  res.render("project", {
    title: project.title,
    project,
    categories
  });
};

const showNewProjectForm = async (req, res) => {
  const organizations = await getAllOrganizations();

  res.render("new-project", {
    title: "New Project",
    errors: [],
    project: {},
    organizations
  });
};

const createNewProject = async (req, res) => {
  const errors = validationResult(req);
  const organizations = await getAllOrganizations();

  const project = {
    organization_id: req.body.organization_id,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    project_date: req.body.project_date
  };

  if (!errors.isEmpty()) {
    return res.render("new-project", {
      title: "New Project",
      errors: errors.array(),
      project,
      organizations
    });
  }

  await createProject(project);

  req.flash("success", "Project created successfully.");
  res.redirect("/projects");
};

const showEditProjectForm = async (req, res) => {
  const project = await getProjectById(req.params.id);
  const organizations = await getAllOrganizations();

  res.render("edit-project", {
    title: "Edit Project",
    errors: [],
    project,
    organizations
  });
};

const updateExistingProject = async (req, res) => {
  const errors = validationResult(req);
  const organizations = await getAllOrganizations();

  const project = {
    project_id: req.params.id,
    organization_id: req.body.organization_id,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    project_date: req.body.project_date
  };

  if (!errors.isEmpty()) {
    return res.render("edit-project", {
      title: "Edit Project",
      errors: errors.array(),
      project,
      organizations
    });
  }

  await updateProject(req.params.id, project);

  req.flash("success", "Project updated successfully.");
  res.redirect("/projects");
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const project = await getProjectById(projectId);
  const categories = await getAllCategoriesForAssignment();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const assignedCategoryIds = assignedCategories.map((category) => {
    return category.category_id;
  });

  res.render("assign-categories", {
    title: "Assign Categories",
    project,
    categories,
    assignedCategoryIds
  });
};

const saveProjectCategories = async (req, res) => {
  const projectId = req.params.projectId;

  let categoryIds = req.body.categoryIds || [];

  if (!Array.isArray(categoryIds)) {
    categoryIds = [categoryIds];
  }

  await updateProjectCategories(projectId, categoryIds);

  req.flash("success", "Project categories updated successfully.");
  res.redirect(`/project/${projectId}`);
};

export {
  showProjects,
  showProjectDetails,
  showNewProjectForm,
  createNewProject,
  showEditProjectForm,
  updateExistingProject,
  showAssignCategoriesForm,
  saveProjectCategories
};