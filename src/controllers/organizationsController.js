import { getAllOrganizations } from "../models/organizations.js";

const showOrganizations = async (req, res) => {
  const organizations = await getAllOrganizations();

  res.render("organizations", {
    title: "Organizations",
    organizations
  });
};

export { showOrganizations };