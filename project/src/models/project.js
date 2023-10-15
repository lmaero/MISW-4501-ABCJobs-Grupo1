class TechnicalProfile {
  constructor(techSkills, programmingLanguages, roles, yearsOfExperience) {
    this.techSkills = techSkills;
    this.programmingLanguages = programmingLanguages;
    this.roles = roles;
    this.yearsOfExperience = yearsOfExperience;
  }
}

const Roles = {
  BACKEND: "Backend",
  FRONTEND: "Frontend",
  FULLSTACK: "Fullstack",
  TECH_LEAD: "Tech Lead",
  PRODUCT_MANAGER: "Product Manager",
  ARCHITECT: "Architect",
  QA: "QA",
  TESTER: "Tester",
  DEVOPS: "Devops",
  CLOUD_ARCHITECT: "Cloud Architect",
  BUSINESS_ANALYST: "Business Analyst",
  DATA_ANALYST: "Data Analyst",
  IOT: "IOT",
  DATA_SCIENTIST: "Data Scientist",
  AI_PROGRAMMER: "AI Programmer",
  BLOCKCHAIN_DEVELOPER: "Blockchain Developer",
  SCRUM_MASTER: "Scrum Master",
  SECURITY_ANALYST: "Security Analyst",
  CYBERSECURITY_ANALYST: "Cybersecurity Analyst",
  SOFTWARE_ENGINEER: "Software Engineer",
  PENTESTER: "Pentester",
  UX_UI_DESIGNER: "UX UI Desginer",
  GRAPHIC_DESIGNER: "Graphic Desginer",
};

class Project {
  constructor(
    id,
    team,
    price,
    budget,
    deadline,
    description,
    registeredWorkHours,
    techSkills,
    programmingLanguages,
    roles,
    yearsOfExperience,
    stakeholder
  ) {
    this.id = id;
    this.team = team;
    this.price = price;
    this.budget = budget;
    this.deadline = deadline;
    this.description = description;
    this.registeredWorkHours = registeredWorkHours;
    this.techSkills = techSkills;
    this.programmingLanguages = programmingLanguages;
    this.roles = roles;
    this.yearsOfExperience = yearsOfExperience;
    this.stakeholder = stakeholder;
    this.company = this.company;
  }
}

module.exports = Project;
