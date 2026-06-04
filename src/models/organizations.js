import db from "./db.js";

const getAllOrganizations = async () => {
  const query = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization
    ORDER BY organization_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getOrganizationById = async (id) => {
  const query = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization
    WHERE organization_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getProjectsByOrganizationId = async (id) => {
  const query = `
    SELECT project_id, title, description, location, project_date
    FROM public.project
    WHERE organization_id = $1
    ORDER BY project_date;
  `;

  const result = await db.query(query, [id]);
  return result.rows;
};

const createOrganization = async (organization) => {
  const query = `
    INSERT INTO public.organization (
      name,
      description,
      contact_email,
      logo_filename
    )
    VALUES ($1, $2, $3, $4)
    RETURNING organization_id;
  `;

  const values = [
    organization.name,
    organization.description,
    organization.contact_email,
    organization.logo_filename
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

const updateOrganization = async (id, organization) => {
  const query = `
    UPDATE public.organization
    SET
      name = $1,
      description = $2,
      contact_email = $3,
      logo_filename = $4
    WHERE organization_id = $5;
  `;

  const values = [
    organization.name,
    organization.description,
    organization.contact_email,
    organization.logo_filename,
    id
  ];

  await db.query(query, values);
};

export {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId,
  createOrganization,
  updateOrganization
};