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

export {
  getAllUsers,
  getUserByEmail,
  createUser
};