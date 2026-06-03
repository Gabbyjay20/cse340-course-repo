import {
  getAllProjects,
  getProjectById,
  getCategoriesByProjectId,
  getAllCategoriesForAssignment,
  updateProjectCategories
} from "../models/projects.js";

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
  showAssignCategoriesForm,
  saveProjectCategories
};