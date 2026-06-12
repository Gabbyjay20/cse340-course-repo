import {
  addVolunteer,
  removeVolunteer
} from "../models/users.js";

const volunteerForProject = async (req, res) => {
  const userId = req.session.user.user_id;
  const projectId = req.params.projectId;

  await addVolunteer(userId, projectId);

  req.flash("success", "You are now volunteering for this project.");
  res.redirect(`/project/${projectId}`);
};

const removeVolunteerFromProject = async (req, res) => {
  const userId = req.session.user.user_id;
  const projectId = req.params.projectId;

  await removeVolunteer(userId, projectId);

  req.flash("success", "You have been removed from this project.");
  res.redirect(req.get("referer") || "/dashboard");
};

export {
  volunteerForProject,
  removeVolunteerFromProject
};
