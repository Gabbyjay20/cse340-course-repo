import db from "./db.js";

const getAllProjects = async () => {
  const query = `
    SELECT
      project.project_id,
      project.title,
      project.description,
      project.location,
      project.project_date,
      organization.organization_id,
      organization.name AS organization_name
    FROM public.project
    JOIN public.organization
      ON project.organization_id = organization.organization_id
    ORDER BY project.project_date;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getProjectById = async (id) => {
  const query = `
    SELECT
      project.project_id,
      project.title,
      project.description,
      project.location,
      project.project_date,
      organization.organization_id,
      organization.name AS organization_name
    FROM public.project
    JOIN public.organization
      ON project.organization_id = organization.organization_id
    WHERE project.project_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getCategoriesByProjectId = async (id) => {
  const query = `
    SELECT
      category.category_id,
      category.name
    FROM public.category
    JOIN public.project_category
      ON category.category_id = project_category.category_id
    WHERE project_category.project_id = $1
    ORDER BY category.name;
  `;

  const result = await db.query(query, [id]);
  return result.rows;
};

export { getAllProjects, getProjectById, getCategoriesByProjectId };