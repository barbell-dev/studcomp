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

  // API endpoint to handle user login
  app.post("/api/login", (req, res) => {
    const { srn, password } = req.body;

    // Check if the user with the provided srn exists
    db.query(
      "SELECT * FROM signup_data WHERE srn = ?",
      [srn],
      (err, results) => {
        if (err) {
          console.error("Error checking user existence (SRN):", err);
          res.status(500).json({ error: "Internal server error" });
        } else if (results.length === 0) {
          // User with the provided SRN does not exist
          res.status(404).json({ error: "User not found" });
        } else {
          // User with the provided SRN exists, now check the password
          const user = results[0];

          if (user.password === password) {
            // Passwords match, user is authenticated

            // Send the user details back to the client
            res.status(200).json({ message: "Login successful", user });
          } else {
            // Passwords do not match
            res.status(401).json({ error: "Invalid credentials" });
          }
        }
      }
    );
  });

  app.listen(3001, () => {
    console.log("Login server is running on port 3001");
  });
});
