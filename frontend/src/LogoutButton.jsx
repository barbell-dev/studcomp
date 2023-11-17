import React from "react";
import "./LogoutButton.css";

function LogoutButton() {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <button className="logout" id="logoutButton" onClick={handleLogout}>
      LOGOUT
    </button>
  );
}

export default LogoutButton;
