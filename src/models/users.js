import db from "./db.js";

const getAllUsers = async () => {
  const query = `
    SELECT user_id, name, email, role
    FROM public.app_user
    ORDER BY user_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT user_id, name, email, password_hash, role
    FROM public.app_user
    WHERE email = $1;
  `;

  const result = await db.query(query, [email]);
  return result.rows[0];
};

const createUser = async (user) => {
  const query = `
    INSERT INTO public.app_user (
      name,
      email,
      password_hash,
      role
    )
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, name, email, role;
  `;

  const values = [
    user.name,
    user.email,
    user.password_hash,
    user.role || "user"
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO project_volunteer (project_id, user_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;

  await db.query(query, [projectId, userId]);
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM project_volunteer
    WHERE project_id = $1
    AND user_id = $2
  `;

  await db.query(query, [projectId, userId]);
};

const getVolunteerProjects = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.project_date
    FROM project_volunteer pv
    JOIN project p
      ON pv.project_id = p.project_id
    WHERE pv.user_id = $1
    ORDER BY p.project_date;
  `;

  const result = await db.query(query, [userId]);
  return result.rows;
};

export {
  getAllUsers,
  getUserByEmail,
  createUser,
  addVolunteer,
  removeVolunteer,
  getVolunteerProjects
};