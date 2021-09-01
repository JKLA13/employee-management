//require
const mysql = require("mysql2");

//require dotenv
require("dotenv").config();

//connect to sql db
const dbConnect = mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // host: "localhost",
  // dialect: "mysql2",
  // port: 3306,
});
console.log("Connected to database");

module.exports = dbConnect;
