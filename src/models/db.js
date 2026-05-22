process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;