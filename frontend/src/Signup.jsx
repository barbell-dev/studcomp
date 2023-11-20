import "./Signup.css";
import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "./Login.jsx";
import LogoutButton from "./LogoutButton";
const initialTechStackState = {
  react: false,
  angular: false,
  vue: false,
  flutter: false,
  django: false,
  flask: false,
  mysql: false,
  php: false,
  mongodb: false,
  nodejs: false,
  express: false,
  rails: false,
  swift: false,
  reactnative: false,
};
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

    techstack: { ...initialTechStackState },
  });

  const [showLogin, setShowLogin] = useState(false); // Initialize to false
  const handleInputChange = async (event) => {
    const { name, value, type, checked } = event.target;
    let errorMessage = "";
    // const hashedPassword = await bcrypt.hash(formData.password, 10);
    // formData.password = hashedPassword;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        techstack: {
          ...prevFormData.techstack,
          [value]: checked,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
    const techstack = Object.keys(formData.techstack)
      .filter((tech) => formData.techstack[tech])
      .join(",");

    const dataToSend = {
      email: formData.email,
      password: formData.password,
      srn: formData.srn,
      gender: formData.gender,
      campus: formData.campus,
      cgpa: formData.cgpa,
      name: formData.name,
      githubLink: formData.githubLink,
      techstack: techstack,
    };

    try {
      // console.log(formData);
      const response = await fetch("http://localhost:3000/api/signup", {
        //gets the status code (201 or 400 or 401 , etc) from the above url.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
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
                {/* React */}
                <label className="react">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="react"
                    checked={formData.techstack.react}
                    onChange={handleInputChange}
                  />
                  React
                </label>

                {/* Angular */}
                <label className="angular">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="angular"
                    checked={formData.techstack.angular}
                    onChange={handleInputChange}
                  />
                  Angular
                </label>

                {/* Vue */}
                <label className="vue">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="vue"
                    checked={formData.techstack.vue}
                    onChange={handleInputChange}
                  />
                  Vue
                </label>

                {/* Flutter */}
                <label className="flutter">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="flutter"
                    checked={formData.techstack.flutter}
                    onChange={handleInputChange}
                  />
                  Flutter
                </label>

                {/* Django */}
                <label className="django">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="django"
                    checked={formData.techstack.django}
                    onChange={handleInputChange}
                  />
                  Django
                </label>

                {/* Flask */}
                <label className="flask">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="flask"
                    checked={formData.techstack.flask}
                    onChange={handleInputChange}
                  />
                  Flask
                </label>

                {/* NodeJS */}
                <label className="nodejs">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="nodejs"
                    checked={formData.techstack.nodejs}
                    onChange={handleInputChange}
                  />
                  NodeJS
                </label>

                {/* Express */}
                <label className="express">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="express"
                    checked={formData.techstack.express}
                    onChange={handleInputChange}
                  />
                  Express
                </label>

                {/* Ruby on Rails */}
                <label className="rails">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="rails"
                    checked={formData.techstack.rails}
                    onChange={handleInputChange}
                  />
                  Ruby on Rails \
                </label>

                {/* PHP */}
                <label className="php">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="php"
                    checked={formData.techstack.php}
                    onChange={handleInputChange}
                  />
                  PHP
                </label>

                {/* MySQL */}
                <label className="mysql">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="mysql"
                    checked={formData.techstack.mysql}
                    onChange={handleInputChange}
                  />
                  MySQL
                </label>

                {/* MongoDB */}
                <label className="mongodb">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="mongodb"
                    checked={formData.techstack.mongodb}
                    onChange={handleInputChange}
                  />
                  MongoDB
                </label>

                {/* Swift */}
                <label className="swift">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="swift"
                    checked={formData.techstack.swift}
                    onChange={handleInputChange}
                  />
                  Swift
                </label>

                {/* React Native */}
                <label className="reactnative">
                  <input
                    type="checkbox"
                    name="techstack"
                    value="reactnative"
                    checked={formData.techstack.reactnative}
                    onChange={handleInputChange}
                  />
                  React Native
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
