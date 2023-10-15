const pool = require("./database");

const getProjectById = async (id) => {
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  return result.rows[0];
};

const addProject = async (projectData) => {
  const result = await pool.query(
    "INSERT INTO projects (team, price, budget, deadline, description, registeredWorkHours, requiredProfile, stakeholder, company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
    [
      projectData.team,
      projectData.price,
      projectData.budget,
      projectData.deadline,
      projectData.description,
      projectData.registeredWorkHours,
      projectData.requiredProfile,
      projectData.stakeholder,
      projectData.company,
    ]
  );
  return result.rows[0];
};

module.exports = {
  getProjectById,
  addProject,
};
