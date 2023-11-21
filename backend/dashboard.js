const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(bodyParser.json());
app.use(cors());
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

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

  // Create teams table
  const createTeamsTableQuery = `
    CREATE TABLE IF NOT EXISTS teams (
      teamID INT AUTO_INCREMENT PRIMARY KEY,
      teamName VARCHAR(255) NOT NULL,
      domainID VARCHAR(50) NOT NULL,
      srn VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (srn) REFERENCES signup_data(srn) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  db.query(createTeamsTableQuery, (err) => {
    if (err) {
      console.error("Error creating teams table:", err);
    } else {
      console.log("Teams table created successfully");
    }
  });
  const createTeamMembersTableQuery = `
  CREATE TABLE IF NOT EXISTS team_members (
    memberID INT AUTO_INCREMENT PRIMARY KEY,
    teamID INT,
    srn VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teamID) REFERENCES teams(teamID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (srn) REFERENCES signup_data(srn) ON DELETE CASCADE ON UPDATE CASCADE
  )
`;
  db.query(createTeamMembersTableQuery, (err) => {
    if (err) {
      console.error("Error creating team_members table:", err);
    } else {
      console.log("Team members table created successfully");
    }
  });

  // Create team_audit table
  const createTeamAuditTableQuery = `
    CREATE TABLE IF NOT EXISTS team_audit (
      auditID INT AUTO_INCREMENT PRIMARY KEY,
      actionType VARCHAR(50) NOT NULL,
      teamID INT,
      srn VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teamID) REFERENCES teams(teamID) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  db.query(createTeamAuditTableQuery, (err) => {
    if (err) {
      console.error("Error creating team_audit table:", err);
    } else {
      console.log("Team audit table created successfully");
    }
  });

  // API endpoint for checking if a team exists
  app.post("/api/check-team", (req, res) => {
    const { teamName } = req.body;

    // Check if a team with the same teamName already exists
    const checkTeamQuery = "SELECT * FROM teams WHERE teamName = ?";
    db.query(checkTeamQuery, [teamName], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error checking team existence:", checkErr);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (checkResults.length > 0) {
          // Team with the same teamName already exists
          res
            .status(400)
            .json({ error: "Team with the same name already exists" });
        } else {
          // Team with the same teamName doesn't exist
          res.status(200).json({ message: "Team name is available" });
        }
      }
    });
  });

  // API endpoint for creating a team
  app.post("/api/create-team", (req, res) => {
    const { teamName, domainID, srn } = req.body;
    // Check if teamName and domainID are provided
    if (!teamName || !domainID) {
      return res
        .status(400)
        .json({ error: "TeamName and domainID are required" });
    }
    // Check if a team with the same teamName already exists
    const checkTeamQuery = "SELECT * FROM teams WHERE teamName = ?";
    db.query(checkTeamQuery, [teamName], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error checking team existence:", checkErr);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (checkResults.length > 0) {
          // Team with the same teamName already exists
          res
            .status(400)
            .json({ error: "Team with the same name already exists" });
        } else {
          // Team with the same teamName doesn't exist, proceed with the insertion
          const createTeamQuery =
            "INSERT INTO teams (teamName, domainID, srn) VALUES (?, ?, ?)";
          const teamAuditQuery =
            "INSERT INTO team_audit (actionType, teamID, srn) VALUES ('CREATE', LAST_INSERT_ID(), ?)";

          db.query(
            createTeamQuery,
            [teamName, domainID, srn],
            (err, results) => {
              if (err) {
                console.error("Error creating team:", err);
                res.status(500).json({ error: "Internal server error" });
              } else {
                // Execute the team audit query
                db.query(teamAuditQuery, [srn], (auditErr) => {
                  if (auditErr) {
                    console.error(
                      "Error recording team creation in audit:",
                      auditErr
                    );
                  }
                });

                res.status(201).json({
                  message: "Team created successfully",
                  teamID: results.insertId,
                });
              }
            }
          );
        }
      }
    });
  });

  // API endpoint to get details of all students
  app.get("/api/dashboard", (req, res) => {
    // Retrieve all records from the signup_data table
    const query = `
      SELECT signup_data.*, projects.domainName, projects.projectName
      FROM signup_data
      LEFT JOIN projects ON signup_data.srn = projects.srn`;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching signup_data:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Send the list of users back to the client
        res.status(200).json(results);
      }
    });
  });

  // API endpoint to get the number of records
  app.get("/api/dashboardcount", (req, res) => {
    // Retrieve the number of records.
    db.query("SELECT COUNT(*) as count FROM signup_data", (err, results) => {
      if (err) {
        console.log("Error fetching the number of records:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results[0].count);
      }
    });
  });

  // New API endpoint to get available teams
  app.get("/api/available-teams", (req, res) => {
    // Retrieve teams with fewer than 4 members
    const query = `
      SELECT teams.teamID, teams.teamName, COUNT(team_members.srn) AS memberCount
      FROM teams
      LEFT JOIN team_members ON teams.teamID = team_members.teamID
      GROUP BY teams.teamID
      HAVING memberCount < 4
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching available teams:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    });
  });
  // API endpoint to check if a user is already a member of the team
  app.post("/api/check-membership", (req, res) => {
    const { teamID, srn } = req.body;

    const checkMembershipQuery =
      "SELECT COUNT(*) AS isMember FROM team_members WHERE teamID = ? AND srn = ?";
    db.query(checkMembershipQuery, [teamID, srn], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error checking team membership:", checkErr);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const isMember = checkResults[0].isMember > 0;
        res.status(200).json({ isMember });
      }
    });
  });

  // New API endpoint to join a team
  app.post("/api/join-team", (req, res) => {
    const { teamID, srn } = req.body;

    // Check if the team has fewer than 4 members
    const checkMembersQuery =
      "SELECT COUNT(*) AS memberCount FROM team_members WHERE teamID = ?";
    db.query(checkMembersQuery, [teamID], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error checking team members:", checkErr);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const memberCount = checkResults[0].memberCount;
        if (memberCount < 4) {
          // Team has fewer than 4 members, proceed with joining
          const joinTeamQuery =
            "INSERT INTO team_members (teamID, srn) VALUES (?, ?)";
          db.query(joinTeamQuery, [teamID, srn], (joinErr) => {
            if (joinErr) {
              console.error("Error joining team:", joinErr);
              res.status(500).json({ error: "Internal server error" });
            } else {
              // ("Team joined succesfully");
              res.status(201).json({ message: "Joined team successfully" });
            }
          });
        } else {
          // Team already has 4 members
          alert("Team is full cant join.");
          res.status(400).json({ error: "Team is full, cannot join" });
        }
      }
    });
  });

  app.listen(3003, () => {
    console.log("Dashboard server is running on port 3003");
  });
});
