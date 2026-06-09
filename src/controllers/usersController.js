import { getAllUsers } from "../models/users.js";

const showUsers = async (req, res) => {
  const users = await getAllUsers();

  res.render("users", {
    title: "Registered Users",
    users
  });
};

export { showUsers };