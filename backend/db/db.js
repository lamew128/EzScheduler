let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const { count, Console } = require("console");
const { create } = require("domain");
const { promiseImpl } = require("ejs");
const { Pool } = require("pg");
const { resourceLimits } = require("worker_threads");
const pool = new Pool(dbParams);

const getAllUsers = () => {
  return pool
  .query(
    `SELECT * FROM users`)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getAllUsers
}
