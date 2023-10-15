require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "postgres",
  database: "projects",
  password: "admin",
  port: process.env.DATABASE || 5433,
});

module.exports = pool;
