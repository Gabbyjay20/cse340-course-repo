import { getAllProjects } from "../models/projects.js";

const showProjects = async (req, res) => {
  const projects = await getAllProjects();

  res.render("projects", {
    title: "Projects",
    projects
  });
};

export { showProjects };