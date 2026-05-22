import db from "./db.js";

const getAllProjects = async () => {
  const query = `
    SELECT
      project.project_id,
      project.title,
      project.description,
      project.location,
      project.project_date,
      organization.name AS organization_name,
      category.name AS category_name
    FROM public.project
    JOIN public.organization
      ON project.organization_id = organization.organization_id
    JOIN public.project_category
      ON project.project_id = project_category.project_id
    JOIN public.category
      ON project_category.category_id = category.category_id
    ORDER BY project.project_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

export { getAllProjects };