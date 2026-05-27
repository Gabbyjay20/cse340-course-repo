import {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId
} from "../models/organizations.js";

const showOrganizations = async (req, res) => {
  const organizations = await getAllOrganizations();

  res.render("organizations", {
    title: "Organizations",
    organizations
  });
};

const showOrganizationDetails = async (req, res) => {
  const organizationId = req.params.id;

  const organization = await getOrganizationById(organizationId);
  const projects = await getProjectsByOrganizationId(organizationId);

  res.render("organization", {
    title: organization.name,
    organization,
    projects
  });
};

export { showOrganizations, showOrganizationDetails };