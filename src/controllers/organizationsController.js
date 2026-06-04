import { validationResult } from "express-validator";

import {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId,
  createOrganization,
  updateOrganization
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

const showNewOrganizationForm = (req, res) => {
  res.render("new-organization", {
    title: "New Organization",
    errors: [],
    organization: {}
  });
};

const createNewOrganization = async (req, res) => {
  const errors = validationResult(req);

  const organization = {
    name: req.body.name,
    description: req.body.description,
    contact_email: req.body.contact_email,
    logo_filename: req.body.logo_filename
  };

  if (!errors.isEmpty()) {
    return res.render("new-organization", {
      title: "New Organization",
      errors: errors.array(),
      organization
    });
  }

  await createOrganization(organization);

  req.flash("success", "Organization created successfully.");
  res.redirect("/organizations");
};

const showEditOrganizationForm = async (req, res) => {
  const organization = await getOrganizationById(req.params.id);

  res.render("edit-organization", {
    title: "Edit Organization",
    errors: [],
    organization
  });
};

const updateExistingOrganization = async (req, res) => {
  const errors = validationResult(req);

  const organization = {
    organization_id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    contact_email: req.body.contact_email,
    logo_filename: req.body.logo_filename
  };

  if (!errors.isEmpty()) {
    return res.render("edit-organization", {
      title: "Edit Organization",
      errors: errors.array(),
      organization
    });
  }

  await updateOrganization(req.params.id, organization);

  req.flash("success", "Organization updated successfully.");
  res.redirect("/organizations");
};

export {
  showOrganizations,
  showOrganizationDetails,
  showNewOrganizationForm,
  createNewOrganization,
  showEditOrganizationForm,
  updateExistingOrganization
};