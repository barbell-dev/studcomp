import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";
export default function Dashboard() {
  const handleDelete = async (srn) => {
    if (
      window.confirm("Are you sure you want to delete this user's account?")
    ) {
      try {
        // Add your API call to delete the user account from the database
        const response = await axios.delete(
          "http://localhost:3000/api/delete-account",
          { data: { srn: srn } }
        );

        // Display alert for successful deletion
        if (response.status === 200) {
          alert("Account has been deleted.");
          // Refresh the user list after deletion
          fetchData();
          fetchCount();
        } else {
          alert("Error in deleting the account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account. Please try again.");
      }
    }
  };

  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchCount();
    fetchData();
  }, []);
  const fetchCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/dashboardcount"
      );
      if (response.status === 200) {
        setUserCount(response.data);
      } else {
        console.error("Error fetching the number of records.", response.status);
      }
    } catch {
      console.error(
        "Error occured while fetching the number of records. (Catch block)"
      );
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/dashboard");

      if (response.status === 200) {
        // Successfully fetched data
        setUserList(response.data);
      } else {
        // Handle other response statuses if needed
        console.error("Error fetching data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1 id="heading">Dashboard</h1>
      <div>
        <h2>User List</h2>
        Total number of users : {userCount}
        <table>
          <thead>
            <tr>
              <th>SRN</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Campus</th>
              <th>CGPA</th>
              <th>Email</th>
              <th>Github</th>
              <th>Delete</th> {/* New column for the delete button */}
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td className="dashboard-td">{user.srn}</td>
                <td className="dashboard-td">{user.name}</td>
                <td className="dashboard-td">{user.gender}</td>
                <td className="dashboard-td">{user.campus}</td>
                <td className="dashboard-td">{user.cgpa}</td>
                <td className="dashboard-td">{user.email}</td>
                <td className="dashboard-td">
                  {user.githubLink ? (
                    <Link to={user.githubLink}>{user.githubLink}</Link>
                  ) : (
                    "Not available"
                  )}
                </td>
                <td className="delete-cell">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.srn)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div id="ld">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
