import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home Page"
  });
});

app.get("/organizations", async (req, res) => {
  res.render("organizations", {
    title: "Organizations"
  });
});

app.get("/projects", async (req, res) => {
  res.render("projects", {
    title: "Projects"
  });
});

app.get("/categories", async (req, res) => {

  const pg = await import("pg");

  const { Pool } = pg.default;

  const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  const result = await pool.query(`
    SELECT category_id, name
    FROM public.category
    ORDER BY name;
  `);

  res.render("categories", {
    title: "Service Project Categories",
    categories: result.rows
  });

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});