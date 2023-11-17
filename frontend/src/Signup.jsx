import "./Signup.css";
import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "./Login.jsx";
import LogoutButton from "./LogoutButton";
function Signup() {
  // Step 1: Create an initial empty array to hold the form data
  // const [formData, setFormData] = useState([]);

  // // Step 2: Add a submit event handler
  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Prevent the form from submitting normally

  //   // Step 3: Retrieve form values and construct an object
  //   const email = document.getElementById("email").value;
  //   const password = document.getElementById("password").value;
  //   const srn = document.getElementById("srn").value;
  //   const gender = document.querySelector('input[name="gender"]:checked').value;
  //   const campus = document.querySelector('input[name="campus"]:checked').value;
  //   const cgpa = document.getElementById("cgpa").value;
  //   const name = document.getElementById("name").value;
  //   const githubLink = document.getElementById("githubLink").value;

  //   const formDataEntry = {
  //     email,
  //     password,
  //     srn,
  //     gender,
  //     campus,
  //     cgpa,
  //     name,
  //     githubLink,
  //   };

  //   // Step 4: Push the object into the array
  //   setFormData([...formData, formDataEntry]);
  //   console.log(formData);
  //   // Optionally, you can reset the form fields
  //   event.target.reset();
  // };
  // Front-end component (Signup.js)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    srn: "",
    gender: "",
    campus: "",
    cgpa: "",
    name: "",
    githubLink: "",
    react: "",
    angular: "",
    vue: "",
    flutter: "",
    django: "",
    flask: "",
    mysql: "",
    php: "",
    mongodb: "",
    node: "",
    express: "",
    rails: "",
    swift: "",
    reactnative: "",
  });

  const [showLogin, setShowLogin] = useState(false); // Initialize to false
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    // const hashedPassword = await bcrypt.hash(formData.password, 10);
    // formData.password = hashedPassword;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.includes("gmail.com")) {
      console.error(
        "Invalid email format. Please include 'gmail.com' in the email."
      );
      alert("Invalid email format. Please include 'gmail.com' in the email.");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password length should be at least 6 characters.");
      return;
    }
    if (isNaN(parseFloat(formData.cgpa))) {
      alert("CGPA should be a numeric value.");
      return;
    }

    if (
      !(
        (formData.srn.startsWith("PES1UG21") ||
          formData.srn.startsWith("PES2UG21")) &&
        formData.srn.length === 13 &&
        ["CS", "EC", "ME", "EE", "BT"].includes(formData.srn.slice(8, 10)) &&
        /^\d{3}$/.test(formData.srn.slice(-3))
      )
    ) {
      alert("Invalid SRN.");
      return;
    }
    if (!formData.githubLink.startsWith("https://github.com/")) {
      alert("Invalid Github link.");
      return;
    }
    if (formData.githubLink.startsWith("https://github.com/")) {
      const username = formData.githubLink.split("/").pop();

      const apiUrl = `https://api.github.com/users/${username}`;
      try {
        const response = await axios.get(apiUrl);
        if (!response.status === 200) {
          alert("User does not exist or error in processing the github link.");
          return;
        }
      } catch (error) {
        alert("User does not exist or error in processing the github link.");
        return;
      }
    }
    try {
      // console.log(formData);
      const response = await fetch("http://localhost:3000/api/signup", {
        //gets the status code (201 or 400 or 401 , etc) from the above url.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data saved successfully!");
        alert("Account created. Directing you to the login page.");
        setShowLogin(true);
      } else if (response.status === 401) {
        alert("Email already exists.Please Login.");
      } else if (response.status === 400) {
        alert("User with the given SRN already exists. Please login.");
      } else if (response.status === 402) {
        alert("User with the given email already exists. Please login.");
      } else {
        console.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error:Server URL to post the data into is wrong .", error);
    }
  };

  return (
    <div>
      {showLogin ? ( // Conditionally render the Profile component
        <Login />
      ) : (
        <>
          ;<h1 className="Heading_Signup">SIGNUP</h1>
          <div className="form-container">
            <form className="form_signup form-border" onSubmit={handleSubmit}>
              <div>
                <label name="email_label">
                  Email{" "}
                  <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <br />
              <div className="password">
                <label>
                  {" "}
                  Password{" "}
                  <input
                    type="password"
                    placeholder="enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <br />
              <div>
                <label name="srn_label">
                  SRN
                  <input
                    type="text"
                    placeholder="Enter SRN "
                    name="srn"
                    value={formData.srn}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <br />
              <div>
                Gender:
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleInputChange}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleInputChange}
                    required
                  />
                  Female
                </label>
              </div>

              <br />
              <div>
                Campus
                <label>
                  <input
                    type="radio"
                    name="campus"
                    value="RR"
                    checked={formData.campus === "RR"}
                    onChange={handleInputChange}
                    required
                  />
                  RR
                </label>
                <label>
                  <input
                    type="radio"
                    name="campus"
                    value="EC"
                    checked={formData.campus === "EC"}
                    onChange={handleInputChange}
                    required
                  />
                  EC
                </label>
                <label>
                  <input
                    type="radio"
                    name="campus"
                    value="HN"
                    checked={formData.campus === "HN"}
                    onChange={handleInputChange}
                    required
                  />
                  HN
                </label>
              </div>

              <br />
              <div>
                <label>
                  CGPA{" "}
                  <input
                    type="text"
                    placeholder="enter cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <br />
              <div>
                <label>
                  Name{" "}
                  <input
                    type="text"
                    placeholder="enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <br />
              <div>
                <label>
                  Github Link
                  <input
                    type="text"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    // value="github"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label>
                  <p className="techstack-text">Tech Stack</p>
                  <br />
                  <div className="techstacks">
                    <label className="react">
                      <input
                        type="checkbox"
                        name="react"
                        value={formData.react}
                      />
                      React
                    </label>
                    <input
                      type="range"
                      name="reactSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    <label className="angular">
                      <input
                        type="checkbox"
                        name="angular"
                        value={formData.angular}
                      />
                      Angular
                    </label>
                    <input
                      type="range"
                      name="angularSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />
                    <label className="vue">
                      <input type="checkbox" name="vue" value={formData.vue} />
                      Vue
                    </label>
                    <input
                      type="range"
                      name="vueSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />
                    <label className="flutter">
                      <input
                        type="checkbox"
                        name="flutter"
                        value={formData.flutter}
                      />
                      Flutter
                    </label>
                    <input
                      type="range"
                      name="flutterSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />
                    {/* Add checkboxes for additional skills here */}
                    {/* Django */}
                    <label className="django">
                      <input
                        type="checkbox"
                        name="django"
                        value={formData.django}
                      />
                      Django
                    </label>
                    <input
                      type="range"
                      name="djangoSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    {/* Flask */}
                    <label className="flask">
                      <input
                        type="checkbox"
                        name="flask"
                        value={formData.flask}
                      />
                      Flask
                    </label>
                    <input
                      type="range"
                      name="flaskSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    {/* NodeJS */}
                    <label className="nodejs">
                      <input
                        type="checkbox"
                        name="nodejs"
                        value={formData.node}
                      />
                      NodeJS
                    </label>
                    <input
                      type="range"
                      name="nodejsSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    {/* Express */}
                    <label className="express">
                      <input
                        type="checkbox"
                        name="express"
                        value={formData.express}
                      />
                      Express
                    </label>
                    <input
                      type="range"
                      name="expressSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    {/* Ruby on Rails */}
                    <label className="rails">
                      <input
                        type="checkbox"
                        name="rails"
                        value={formData.rails}
                      />
                      Ruby on Rails
                    </label>
                    <input
                      type="range"
                      name="railsSlider"
                      min="1"
                      max="10"
                      className="slider"
                      id="rails-slider"
                    />
                    <br />

                    {/* PHP */}
                    <label className="php">
                      <input type="checkbox" name="php" value={formData.php} />
                      PHP
                    </label>
                    <input
                      type="range"
                      name="phpSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    {/* MySQL */}
                    <label className="mysql">
                      <input
                        type="checkbox"
                        name="mysql"
                        value={formData.mysql}
                      />
                      MySQL
                    </label>
                    <input
                      type="range"
                      name="mysqlSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    {/* MongoDB */}
                    <label className="mongodb">
                      <input
                        type="checkbox"
                        name="mongodb"
                        value={formData.mongodb}
                      />
                      MongoDB
                    </label>
                    <input
                      type="range"
                      name="mongodbSlider"
                      min="1"
                      max="10"
                      className="slider"
                      id="mongodb-slider"
                    />
                    <br />

                    {/* Swift */}
                    <label className="swift">
                      <input
                        type="checkbox"
                        name="swift"
                        value={formData.swift}
                      />
                      Swift
                    </label>
                    <input
                      type="range"
                      name="swiftSlider"
                      min="1"
                      max="10"
                      className="slider"
                    />
                    <br />

                    {/* React Native */}
                    <label className="reactnative">
                      <input
                        type="checkbox"
                        name="reactnative"
                        value={formData.reactnative}
                      />
                      React Native
                    </label>
                    <input
                      type="range"
                      name="reactnativeSlider"
                      min="1"
                      max="10"
                      className="slider"
                      id="reactnative-slider"
                    />
                    <br />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  <input type="submit" value="Submit" required />
                </label>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;
