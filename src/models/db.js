import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: true
});

export default pool;