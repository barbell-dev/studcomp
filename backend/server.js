// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const mysql = require("mysql2");
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "unicollab",
//   password: "SqlProj",
//   authPlugins: "mysql_native_password",
// });

// const dbName = "myappdb";

// function createDatabase() {
//   db.query(`CREATE DATABASE ${dbName}`, (err) => {
//     if (err) {
//       console.error("Error creating database:", err);
//     } else {
//       console.log(`Database ${dbName} created successfully`);
//       useDatabase();
//     }
//   });
// }

// function useDatabase() {
//   db.query("USE myappdb", (useDbErr) => {
//     if (useDbErr) {
//       console.error("Error selecting database:", useDbErr);
//       throw useDbErr;
//     }
//     console.log("Using 'myappdb' database.");

//     // Create the 'signup_data' table if it doesn't exist
//     db.query(
//       `CREATE TABLE IF NOT EXISTS signup_data (
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         srn VARCHAR(255) NOT NULL PRIMARY KEY,
//         gender VARCHAR(255) NOT NULL,
//         campus VARCHAR(20) NOT NULL,
//         cgpa NUMERIC NOT NULL,
//         githubLink VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )`,
//       (createTableErr) => {
//         if (createTableErr) {
//           console.error("Error creating 'signup_data' table:", createTableErr);
//           throw createTableErr;
//         }
//         console.log("'signup_data' table is ready.");

//         // API endpoint to handle user signup
//         app.post("/api/signup", (req, res) => {
//           const formData = req.body;

//           db.query(
//             "SELECT * FROM signup_data WHERE srn = ?",
//             [formData.srn],
//             (err, results) => {
//               if (err) {
//                 console.error("Error checking user existence:", err);
//                 res.status(500).json({ error: "Internal server error" });
//               } else if (results.length > 0) {
//                 // User with the provided SRN already exists
//                 res.status(400).json({
//                   error: "User with this SRN already exists. Please login.",
//                 });
//               } else {
//                 db.query(
//                   "SELECT * FROM signup_data WHERE email = ?",
//                   [formData.email],
//                   (emailErr, emailResults) => {
//                     if (emailErr) {
//                       console.error(
//                         "Error checking user existence (Email):",
//                         emailErr
//                       );
//                       res.status(500).json({ error: "Internal server error" });
//                     } else if (emailResults.length > 0) {
//                       // User with the provided email already exists
//                       res.status(402).json({
//                         error:
//                           "User with this email already exists. Please login.",
//                       });
//                     } else {
//                       // The 'signup_data' table already exists, so just add data to it
//                       insertSignupData();
//                     }
//                   }
//                 );
//               }

//               // Function to insert signup data into the 'signup_data' table
//               function insertSignupData() {
//                 const values = [
//                   formData.name,
//                   formData.email,
//                   formData.password,
//                   formData.srn,
//                   formData.gender,
//                   formData.campus,
//                   parseFloat(formData.cgpa), // Convert cgpa to float
//                   formData.githubLink,
//                 ];

//                 db.query(
//                   "INSERT INTO signup_data(name,email,password,srn,gender,campus,cgpa,githubLink) VALUES (?,?,?,?,?,?,?,?)",
//                   values,
//                   (insertErr) => {
//                     if (insertErr) {
//                       console.error(
//                         "Error inserting data into 'signup_data' table:",
//                         insertErr
//                       );
//                       res.status(500).json({ error: "Internal server error" });
//                     } else {
//                       console.log("Data inserted into 'signup_data' table");
//                       res.status(200).json({ message: "Signup successful" });
//                     }
//                   }
//                 );
//               }
//             }
//           );
//         });
//         // API endpoint to handle user data update
//         app.put("/api/update-profile", (req, res) => {
//           const updatedUserData = req.body; // Data sent from the client
//           const srn = updatedUserData.srn; // Identify the user by SRN

//           // Update the user's data in the database
//           if (updatedUserData.password.length >= 6) {
//             db.query(
//               "UPDATE signup_data SET name=?, email=?,password=?, gender=?, campus=?, cgpa=?, githubLink=? WHERE srn=?",
//               [
//                 updatedUserData.name,
//                 updatedUserData.email,
//                 updatedUserData.password,
//                 updatedUserData.gender,
//                 updatedUserData.campus,
//                 updatedUserData.cgpa,
//                 updatedUserData.githubLink,
//                 srn,
//               ],
//               (err, result) => {
//                 if (err) {
//                   console.error("Error updating user data:", err);
//                   res.status(500).json({ error: "Internal server error" });
//                 } else {
//                   console.log("User data updated successfully");
//                   res
//                     .status(200)
//                     .json({ message: "Profile updated successfully" });
//                 }
//               }
//             );
//           } else {
//             res
//               .status(401)
//               .json({
//                 message: "Password length has to be at least 6 characters.",
//               });
//           }
//         });
//         app.listen(3000, () => {
//           console.log("Server is running on port 3000");
//         });
//       }
//     );
//   });
// }

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL server");

//   // Check if the database exists
//   db.query(
//     `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbName}'`,
//     (err, results) => {
//       if (err) {
//         console.error("Error checking if the database exists:", err);
//       } else {
//         if (results.length === 0) {
//           // The database does not exist, so create it
//           createDatabase();
//         } else {
//           // The database already exists, use it
//           useDatabase();
//         }
//       }
//     }
//   );
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "unicollab",
  password: "SqlProj",
  authPlugins: "mysql_native_password",
});

const dbName = "myappdb";

function createDatabase() {
  db.query(`CREATE DATABASE ${dbName}`, (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log(`Database ${dbName} created successfully`);
      useDatabase();
    }
  });
}

function useDatabase() {
  db.query("USE myappdb", (useDbErr) => {
    if (useDbErr) {
      console.error("Error selecting database:", useDbErr);
      throw useDbErr;
    }
    console.log("Using 'myappdb' database.");

    // Create the 'signup_data' table if it doesn't exist
    db.query(
      `CREATE TABLE IF NOT EXISTS signup_data (
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        srn VARCHAR(255) NOT NULL PRIMARY KEY,
        gender VARCHAR(255) NOT NULL,
        campus VARCHAR(20) NOT NULL,
        cgpa NUMERIC NOT NULL,
        githubLink VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      (createTableErr) => {
        if (createTableErr) {
          console.error("Error creating 'signup_data' table:", createTableErr);
          throw createTableErr;
        }
        console.log("'signup_data' table is ready.");

        // Create the 'Domains' table if it doesn't exist
        // Check if the 'Domains' table is empty

        db.query(
          `CREATE TABLE IF NOT EXISTS Domains (
            DomainID INT AUTO_INCREMENT PRIMARY KEY,
            DomainName TEXT,
            DomainDescription TEXT
          )`,
          (createDomainsTableErr) => {
            if (createDomainsTableErr) {
              console.error(
                "Error creating 'Domains' table:",
                createDomainsTableErr
              );
              throw createDomainsTableErr;
            }
            console.log("'Domains' table is ready.");
            // Check if the 'Domains' table is empty

            db.query(
              `SELECT COUNT(*) AS count FROM Domains`,
              (checkEmptyErr, result) => {
                if (checkEmptyErr) {
                  console.error(
                    "Error checking if 'Domains' table is empty:",
                    checkEmptyErr
                  );
                  throw checkEmptyErr;
                }

                const isTableEmpty = result[0].count === 0;

                if (isTableEmpty) {
                  // Insert initial values into the 'Domains' table if it's empty
                  db.query(
                    `INSERT INTO Domains (DomainName, DomainDescription) VALUES 
                  ('Artificial Intelligence (AI) and Machine Learning (ML)', 'Projects involving intelligent systems, pattern recognition, natural language processing, etc.'),
                  ('Data Science and Big Data', 'Projects dealing with large datasets, data analysis, data visualization, and predictive modeling.'),
                  ('Cybersecurity and Information Assurance', 'Projects related to securing networks, systems, data, cryptography, ethical hacking, etc.'),
                  ('Software Development and Engineering', 'Projects focusing on software design, development methodologies, algorithms, coding, testing, and debugging.'),
                  ('Computer Networks and Communications', 'Projects on network architecture, protocols, routing algorithms, wireless networks, IoT, etc.'),
                  ('Cloud Computing', 'Projects involving cloud infrastructure, services, deployment models, and distributed computing.'),
                  ('Human-Computer Interaction (HCI)', 'Projects related to user interfaces, user experience design, usability, accessibility, etc.'),
                  ('Computer Vision and Image Processing', 'Projects dealing with image recognition, computer graphics, image analysis, and visual information processing.'),
                  ('Robotics', 'Projects involving the design, construction, programming, and operation of robots, autonomous systems, and drones.'),
                  ('Databases and Information Retrieval', 'Projects on database management systems, indexing, query optimization, and information retrieval techniques.')`,
                    (insertDomainsErr, result) => {
                      if (insertDomainsErr) {
                        console.error(
                          "Error inserting data into 'Domains' table:",
                          insertDomainsErr
                        );
                        throw insertDomainsErr;
                      }
                      console.log("Initial data inserted into 'Domains' table");
                    }
                  );
                } else {
                  console.log(
                    "'Domains' table is not empty, skipped initial insertion."
                  );
                }
                app.post("/api/signup", (req, res) => {
                  const formData = req.body;

                  db.query(
                    "SELECT * FROM signup_data WHERE srn = ?",
                    [formData.srn],
                    (err, results) => {
                      if (err) {
                        console.error("Error checking user existence:", err);
                        res
                          .status(500)
                          .json({ error: "Internal server error" });
                      } else if (results.length > 0) {
                        res.status(400).json({
                          error:
                            "User with this SRN already exists. Please login.",
                        });
                      } else {
                        db.query(
                          "SELECT * FROM signup_data WHERE email = ?",
                          [formData.email],
                          (emailErr, emailResults) => {
                            if (emailErr) {
                              console.error(
                                "Error checking user existence (Email):",
                                emailErr
                              );
                              res
                                .status(500)
                                .json({ error: "Internal server error" });
                            } else if (emailResults.length > 0) {
                              res.status(402).json({
                                error:
                                  "User with this email already exists. Please login.",
                              });
                            } else {
                              insertSignupData();
                              insertTechstackData();
                            }
                          }
                        );
                      }

                      function insertSignupData() {
                        const values = [
                          formData.name,
                          formData.email,
                          formData.password,
                          formData.srn,
                          formData.gender,
                          formData.campus,
                          parseFloat(formData.cgpa),
                          formData.githubLink,
                        ];

                        db.query(
                          "INSERT INTO signup_data(name,email,password,srn,gender,campus,cgpa,githubLink) VALUES (?,?,?,?,?,?,?,?)",
                          values,
                          (insertErr) => {
                            if (insertErr) {
                              console.error(
                                "Error inserting data into 'signup_data' table:",
                                insertErr
                              );
                              res
                                .status(500)
                                .json({ error: "Internal server error" });
                            } else {
                              console.log(
                                "Data inserted into 'signup_data' table"
                              );
                              // The SRN and techstack values are logged here
                              console.log(
                                "Inserting techstack data for SRN:",
                                formData.srn
                              );
                              console.log(
                                "Techstack values:",
                                formData.techstack
                              );
                              insertTechstackData(
                                formData.srn,
                                formData.techstack
                              );
                              res
                                .status(200)
                                .json({ message: "Signup successful" });
                            }
                          }
                        );
                      }

                      function insertTechstackData(srn, techstack) {
                        console.log("Inserting techstack data for SRN:", srn);
                        console.log("Techstack values:", techstack);
                        // Prepare an object with default values for all tech columns
                        if (techstack && Array.isArray(techstack)) {
                          const techstackValues = {
                            srn,
                            react: false,
                            angular: false,
                            vue: false,
                            flutter: false,
                            django: false,
                            flask: false,
                            nodejs: false,
                            express: false,
                            rubyonrails: false,
                            php: false,
                            mysql: false,
                            mongodb: false,
                            swift: false,
                            reactnative: false,
                          };
                          // Update the object based on the selected techstack in the signup form
                          techstack.forEach((tech) => {
                            // Convert the tech value to lowercase for case-insensitive comparison
                            const techLowerCase = tech.toLowerCase();

                            // Check if the tech value is a valid column name
                            if (techstackValues.hasOwnProperty(techLowerCase)) {
                              techstackValues[techLowerCase] = true;
                            } else {
                              console.warn(
                                `Ignoring invalid tech value: ${tech}`
                              );
                            }
                          });

                          db.query(
                            "INSERT INTO techstack(srn, react, angular, vue,flutter,django,flask,nodejs,express,rubyonrails,php,mysql,mongodb,swift,reactnative) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                            [
                              techstackValues.srn,
                              techstackValues.react,
                              techstackValues.angular,
                              techstackValues.vue,
                              techstackValues.flutter,
                              techstackValues.django,
                              techstackValues.flask,
                              techstackValues.nodejs,
                              techstackValues.express,
                              techstackValues.rubyonrails,
                              techstackValues.php,
                              techstackValues.mysql,
                              techstackValues.mongodb,
                              techstackValues.swift,
                              techstackValues.reactnative,
                            ],
                            (insertTechstackErr) => {
                              if (insertTechstackErr) {
                                console.error(
                                  "Error inserting data into 'techstack' table:",
                                  insertTechstackErr
                                );
                                // Handle the error as needed
                              } else {
                                console.log(
                                  "Techstack data inserted into 'techstack' table"
                                );
                              }
                            }
                          );
                        }
                      }
                    }
                  );
                });

                app.delete("/api/delete-account", (req, res) => {
                  const { srn } = req.body;

                  // Add logic to delete the user with the specified SRN from the 'signup_data' table
                  db.query(
                    "DELETE FROM signup_data WHERE srn = ?",
                    [srn],
                    (err, results) => {
                      if (err) {
                        console.error("Error deleting account:", err);
                        res
                          .status(500)
                          .json({ error: "Internal server error" });
                      } else {
                        if (results.affectedRows > 0) {
                          // Account deleted successfully
                          db.query(
                            "DELETE FROM projects WHERE srn = ?",
                            [srn],
                            (err, results) => {
                              if (err) {
                                console.error(
                                  "Error deleting the account:",
                                  err
                                );
                                res
                                  .status(500)
                                  .json({ error: "Internal server error" });
                              } else {
                                res
                                  .status(200)
                                  .json({
                                    message: "Account deleted successfully",
                                  });
                              }
                            }
                          );
                        } else {
                          // No user found with the specified SRN
                          res.status(404).json({ error: "User not found" });
                        }
                      }
                    }
                  );
                });
                // API endpoint to fetch all domains
                app.get("/api/domains", (req, res) => {
                  db.query(
                    "SELECT DomainName, DomainDescription FROM Domains",
                    (err, results) => {
                      if (err) {
                        console.error("Error fetching domains:", err);
                        res
                          .status(500)
                          .json({ error: "Internal server error" });
                      } else {
                        res.status(200).json(results);
                      }
                    }
                  );
                });

                app.post("/api/addProject", (req, res) => {
                  const { projectName, domainId, srn } = req.body;
                  // console.log(srn);
                  // Call the MySQL stored procedure
                  db.query(
                    "CALL AddProject(?, ?, ?)",
                    [projectName, domainId, srn],
                    (err, results) => {
                      if (err) {
                        console.error("Error calling stored procedure:", err);
                        res
                          .status(500)
                          .json({ error: "Internal server error" });
                      } else {
                        console.log("Stored procedure called successfully");
                        res.status(200).json({
                          message: "Stored procedure executed successfully",
                        });
                      }
                    }
                  );
                });
                // API endpoint to find projects based on selected criteria (projectName or domainId)
                app.post("/api/findProjects", (req, res) => {
                  const { searchBy, searchText, srn } = req.body;
                  console.log(searchText);
                  console.log(srn);
                  // Define the appropriate procedure name based on the selected search criteria
                  let procedureName;
                  if (searchBy === "projectName") {
                    procedureName = "FindProjectsByProjectNameAndSRN";
                  } else if (searchBy === "domainId") {
                    procedureName = "FindProjectsByDomainIdWithSRN";
                  } else {
                    return res
                      .status(400)
                      .json({ error: "Invalid search criteria" });
                  }
                  // console.log()
                  // Call the corresponding stored procedure with searchText as parameter
                  db.query(
                    `CALL ${procedureName}(?,?)`,
                    [searchText, srn],
                    (err, results) => {
                      if (err) {
                        console.error("Error executing stored procedure:", err);
                        res
                          .status(500)
                          .json({ error: "Internal server error" });
                      } else {
                        // console.log(results);
                        console.log(
                          `Projects found using ${searchBy}:`,
                          results
                        );
                        res.status(200).json(results);
                      }
                    }
                  );
                  console.log(result);
                });
                app.post("/api/getUserProjects", (req, res) => {
                  const { srn } = req.body;
                  console.log(srn);
                  console.log("DAMAR");
                  db.query(
                    "SELECT * FROM projects where srn = ?",
                    [srn],
                    (err, results) => {
                      if (err) {
                        console.error("Error fetching user projects:", err);
                        res
                          .status(500)
                          .json({ error: "Internal server error" });
                      } else {
                        res.status(200).json(results);
                      }
                    }
                  );
                });

                // API endpoint to handle user data update
                app.put("/api/update-profile", (req, res) => {
                  // Your existing update profile endpoint code...
                  const updatedUserData = req.body; // Data sent from the client
                  const srn = updatedUserData.srn; // Identify the user by SRN

                  // Update the user's data in the database
                  if (updatedUserData.password.length >= 6) {
                    db.query(
                      "UPDATE signup_data SET name=?, email=?,password=?, gender=?, campus=?, cgpa=?, githubLink=? WHERE srn=?",
                      [
                        updatedUserData.name,
                        updatedUserData.email,
                        updatedUserData.password,
                        updatedUserData.gender,
                        updatedUserData.campus,
                        updatedUserData.cgpa,
                        updatedUserData.githubLink,
                        srn,
                      ],
                      (err, result) => {
                        if (err) {
                          console.error("Error updating user data:", err);
                          res
                            .status(500)
                            .json({ error: "Internal server error" });
                        } else {
                          console.log("User data updated successfully");
                          res
                            .status(200)
                            .json({ message: "Profile updated successfully" });
                        }
                      }
                    );
                  } else {
                    res.status(401).json({
                      message:
                        "Password length has to be at least 6 characters.",
                    });
                  }
                });

                app.listen(3000, () => {
                  console.log("Server is running on port 3000");
                });
              }
            );
          }
        );
      }
    );
    db.query(
      `CREATE TABLE IF NOT EXISTS techstack (
        srn VARCHAR(255) PRIMARY KEY,
        react BOOLEAN DEFAULT false,
        angular BOOLEAN DEFAULT false,
        vue BOOLEAN DEFAULT false,
        flutter BOOLEAN DEFAULT false,
        django BOOLEAN DEFAULT false,
        flask BOOLEAN DEFAULT false,
        nodejs BOOLEAN DEFAULT false,
        express BOOLEAN DEFAULT false,
        rubyonrails BOOLEAN DEFAULT false,
        php BOOLEAN DEFAULT false,
        mysql BOOLEAN DEFAULT false,
        mongodb BOOLEAN DEFAULT false,
        swift BOOLEAN DEFAULT false,
        reactnative BOOLEAN DEFAULT false
      );`,
      (createTechstackTableErr) => {
        if (createTechstackTableErr) {
          console.error(
            "Error creating 'techstack' table:",
            createTechstackTableErr
          );
          // Handle the error as needed
        } else {
          console.log("'techstack' table is ready.");
        }
      }
    );
  });
}

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL server");

  // Check if the database exists
  db.query(
    `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbName}'`,
    (err, results) => {
      if (err) {
        console.error("Error checking if the database exists:", err);
      } else {
        if (results.length === 0) {
          // The database does not exist, so create it
          createDatabase();
        } else {
          // The database already exists, use it
          useDatabase();
        }
      }
    }
  );
});
