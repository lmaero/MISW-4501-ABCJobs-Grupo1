require("dotenv").config();

const express = require("express");
const projectRoutes = require("./routes/projectRoutes");
const app = express();

app.use(express.json());
app.use("/api/projects", projectRoutes);

const PORT = process.env.PROJECT_PORT || 4003;

app.listen(PORT, () => {
  console.log(`Microservicio corriendo en el puerto ${PORT}`);
});
