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
    const query = `
    SELECT signup_data.*, projects.domainName, projects.projectName
    FROM signup_data
    LEFT JOIN projects ON signup_data.srn = projects.srn`;
    db.query(query, (err, results) => {
      // console.log(results);

      if (err) {
        console.error("Error fetching signup_data:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Send the list of users back to the client

        res.status(200).json(results);
      }
    });
  });
  app.get("/api/dashboardcount", (req, res) => {
    //Retrieve the number of records.
    db.query("SELECT COUNT(*) as count FROM signup_data", (err, results) => {
      if (err) {
        console.log("Error fetching the number of records:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results[0].count);
        // console.log(results[0].count);
      }
    });
  });
  app.listen(3003, () => {
    console.log("Dashboard server is running on port 3003");
  });
});
