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
  database: "myappdb", // Specify the database here
  authPlugin: "mysql_native_password",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL server");

  // API endpoint to handle admin login
  app.post("/api/admin", (req, res) => {
    const { password } = req.body;

    // Check if the admin with the provided password exists
    db.query(
      "SELECT * FROM admin WHERE password = ?",
      [password],
      (err, results) => {
        if (err) {
          console.error("Error checking admin password:", err);
          res.status(500).json({ error: "Internal server error" });
        } else if (results.length === 0) {
          // Admin with the provided password does not exist
          res.status(401).json({ error: "Invalid admin credentials" });
        } else {
          // Admin with the provided password exists

          // Send the admin details back to the client
          res
            .status(200)
            .json({ message: "Admin login successful", admin: results[0] });
        }
      }
    );
  });

  app.listen(3002, () => {
    console.log("Admin server is running on port 3002");
  });
});
