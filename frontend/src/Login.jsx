import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Profile from "./Profile.jsx";
import axios from "axios";
// Login.js
import { useDispatch } from "react-redux";
import { setUser } from "./userSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    srn: "",
    password: "",
  });

  const [showProfile, setShowProfile] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        srn: formData.srn,
        password: formData.password,
      });

      if (response.status === 200) {
        // User successfully logged in
        console.log("User logged in successfully!");
        alert("Logging in...");
        dispatch(setUser(response.data.user));
        // Store user details received from the server
        // setIsAuthenticated(true);
        setUserDetails(response.data.user);

        setShowProfile(true);
      } else if (response.status === 401) {
        // Handle login failure, e.g., show an error message
        alert("Login failed. Invalid credentials");
        console.error("Login failed. Invalid credentials");
      } else if (response.status === 404) {
        alert("User not found");
        console.log("No SRN found.");
      }
    } catch (error) {
      alert("Error.Login failed because of invalid credentials.");
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div>
      {showProfile ? (
        <Profile userData={userDetails} />
      ) : (
        <div className="login-container">
          <h1>LOGIN</h1>
          <form className="form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your SRN"
              name="srn"
              checked={formData.srn}
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              checked={formData.password}
              onChange={handleInputChange}
              required
            />
            <br />
            <button type="s-ubmit" className="submit-button">
              Submit
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Create one.</Link>
            <br></br>
            <Link to="/admin">Click here for admin login.</Link>
          </p>
        </div>
      )}
    </div>
  );
}
