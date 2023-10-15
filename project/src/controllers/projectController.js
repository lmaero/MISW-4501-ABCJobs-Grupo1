let projects = []; // Simplificamos usando una base de datos en memoria.
let currentId = 1;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getProject = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return res.status(404).send({ message: "Project not found" });
  }
  res.send(project);
};

exports.updateProject = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return res.status(404).send({ message: "Project not found" });
  }
  // Actualizamos (este es un ejemplo simplificado)
  project.description = req.body.description || project.description;
  res.send(project);
};

exports.addProject = (req, res) => {
  console.log(req.body); // Imprime el cuerpo de la solicitud
  const newProject = {
    id: currentId++,
    team: req.body.team,
    price: req.body.price,
    budget: req.body.budget,
    deadline: req.body.deadline,
    description: req.body.description,
    registeredWorkHours: req.body.registeredWorkHours,
    techSkills: req.body.techSkills,
    programmingLanguages: req.body.programmingLanguages,
    roles: req.body.roles,
    yearsOfExperience: req.body.yearsOfExperience,
    stakeholder: req.body.stakeholder,
    company: req.body.company,
  };

  projects.push(newProject);
  res.status(201).send(newProject);
};
