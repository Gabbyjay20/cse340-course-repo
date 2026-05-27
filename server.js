import "dotenv/config";
import express from "express";
import router from "./src/routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", router);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("500", {
    title: "Server Error"
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});