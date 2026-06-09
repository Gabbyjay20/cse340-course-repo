import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { createUser, getUserByEmail } from "../models/users.js";

const showRegisterForm = (req, res) => {
  res.render("register", {
    title: "Register",
    errors: [],
    user: {}
  });
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  if (!errors.isEmpty()) {
    return res.render("register", {
      title: "Register",
      errors: errors.array(),
      user
    });
  }

  const existingUser = await getUserByEmail(user.email);

  if (existingUser) {
    return res.render("register", {
      title: "Register",
      errors: [{ msg: "Email is already registered." }],
      user
    });
  }

  const password_hash = await bcrypt.hash(user.password, 10);

  await createUser({
    name: user.name,
    email: user.email,
    password_hash,
    role: "user"
  });

  req.flash("success", "Registration successful. Please log in.");
  res.redirect("/login");
};

const showLoginForm = (req, res) => {
  res.render("login", {
    title: "Login",
    errors: [],
    user: {}
  });
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);

  const userInput = {
    email: req.body.email,
    password: req.body.password
  };

  if (!errors.isEmpty()) {
    return res.render("login", {
      title: "Login",
      errors: errors.array(),
      user: userInput
    });
  }

  const user = await getUserByEmail(userInput.email);

  if (!user) {
    return res.render("login", {
      title: "Login",
      errors: [{ msg: "Invalid email or password." }],
      user: userInput
    });
  }

  const passwordMatches = await bcrypt.compare(
    userInput.password,
    user.password_hash
  );

  if (!passwordMatches) {
    return res.render("login", {
      title: "Login",
      errors: [{ msg: "Invalid email or password." }],
      user: userInput
    });
  }

  req.session.user = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  req.flash("success", "You are logged in.");
  res.redirect("/dashboard");
};

const showDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    user: req.session.user
  });
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  showDashboard,
  logoutUser
};