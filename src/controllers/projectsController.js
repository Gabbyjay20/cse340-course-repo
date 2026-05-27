import {
  getAllProjects,
  getProjectById,
  getCategoriesByProjectId
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

export { showProjects, showProjectDetails };