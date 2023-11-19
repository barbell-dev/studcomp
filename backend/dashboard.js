const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "unicollab",
  password: "SqlProj",
  database: "myappdb",
  authPlugin: "mysql_native_password",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL server");

  // API endpoint to get details of all students
  app.get("/api/dashboard", (req, res) => {
    // Retrieve all records from the signup_data table
    db.query("SELECT * FROM signup_data", (err, results) => {
      if (err) {
        console.error("Error fetching signup_data:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Send the list of users back to the client
        res.status(200).json(results);
      }
    });
  });

  app.listen(3003, () => {
    console.log("Dashboard server is running on port 3003");
  });
});
