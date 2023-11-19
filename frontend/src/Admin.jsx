import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./Admin.css";
export default function Admin() {
  const [adminData, setadminData] = useState({
    password: "",
  });

  const [showDashboard, setshowDashboard] = useState(false);
  const handleAdminLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/api/admin", {
        password: adminData.password,
      });
      if (response.status === 200) {
        console.log("Admin logged in successfully !");
        alert("Admin logged in successfully !");
        setshowDashboard(true);
      } else if (response.status === 401) {
        alert("Invalid admin password");
        return;
      } else {
        alert("Server error");
        return;
      }
    } catch {
      alert("Error during admin login. Invalid credentials");
      return;
    }
  };
  const handlePasswordChange = (event) => {
    setadminData({
      password: event.target.value,
    });
  };
  return (
    <div className="admin">
      {showDashboard ? (
        <Dashboard />
      ) : (
        <div>
          <h1 className="admin-heading">Admin Login</h1>
          <form className="admin-form" onSubmit={handleAdminLogin}>
            <input
              type="password"
              placeholder="Enter Admin password"
              value={adminData.password}
              onChange={handlePasswordChange}
            />
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
}
