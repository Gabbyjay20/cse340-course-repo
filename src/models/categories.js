import db from "./db.js";

const getAllCategories = async () => {
  const query = `
    SELECT category_id, name
    FROM public.category
    ORDER BY name;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getCategoryById = async (id) => {
  const query = `
    SELECT category_id, name
    FROM public.category
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getProjectsByCategoryId = async (id) => {
  const query = `
    SELECT
      project.project_id,
      project.title,
      project.description,
      project.location,
      project.project_date
    FROM public.project
    JOIN public.project_category
      ON project.project_id = project_category.project_id
    WHERE project_category.category_id = $1
    ORDER BY project.project_date;
  `;

  const result = await db.query(query, [id]);
  return result.rows;
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId };