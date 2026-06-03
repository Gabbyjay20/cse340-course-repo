import "dotenv/config";
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import router from "./src/routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "cse340-secret",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

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