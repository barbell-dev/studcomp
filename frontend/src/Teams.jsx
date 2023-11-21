import React, { useState, useEffect } from "react";
import "./Teams.css";
import Navbar from "./Navbar";

import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./userSlice";
import axios from "axios";

export default function Teams() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    teamName: "",
    domainID: "",
    srn: user.srn,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableTeams, setAvailableTeams] = useState([]);

  useEffect(() => {
    const fetchAvailableTeams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/available-teams"
        );
        setAvailableTeams(response.data);
      } catch (error) {
        console.error("Error fetching available teams:", error);
      }
    };

    fetchAvailableTeams();
  }, []); // Run only once when the component mounts

  const handleJoinClick = async (teamID) => {
    try {
      // Check if the user is already a member of the team
      const checkMembershipResponse = await axios.post(
        "http://localhost:3003/api/check-membership",
        { teamID, srn: user.srn }
      );

      if (checkMembershipResponse.data.isMember) {
        alert("You are already a member of this team.");
      } else {
        // Proceed with joining the team
        const joinResponse = await axios.post(
          "http://localhost:3003/api/join-team",
          { teamID, srn: user.srn }
        );

        if (joinResponse.status === 201) {
          alert("Joined team successfully.");
          // You can update the Redux store or perform other actions as needed
        } else {
          alert("Error joining the team.");
        }
      }
    } catch (error) {
      console.error("Error joining team:", error);
      alert("You cant join the same team twice .");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3003/api/check-team",
        { teamName: formData.teamName }
      );

      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setErrorMessage("");

        const createResponse = await axios.post(
          "http://localhost:3003/api/create-team",
          formData
        );

        if (createResponse.status === 201) {
          // Insert the user who created the team into team_members
          const joinTeamResponse = await axios.post(
            "http://localhost:3003/api/join-team",
            {
              teamID: createResponse.data.teamID,
              srn: user.srn,
            }
          );

          if (joinTeamResponse.status === 201) {
            alert("Team has been created and you have joined it.");
          } else {
            alert("Team has been created, but there was an issue joining.");
          }
        } else {
          alert("Error in creating the team.");
        }

        // Refresh available teams after creating or joining a team
        const availableTeamsResponse = await axios.get(
          "http://localhost:3003/api/available-teams"
        );
        setAvailableTeams(availableTeamsResponse.data);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Team already exists or one or more input fields are empty.");
    }
  };

  return (
    <div className="teams">
      <header>
        <h1>Teams</h1>
      </header>
      <Navbar />
      <div className="create-team">
        <h2 id="h2">Create Team</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="domainID">Domain ID:</label>
            <input
              type="text"
              id="domainID"
              name="domainID"
              value={formData.domainID}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="srn">SRN:</label>
            <input type="text" id="srn" name="srn" value={user.srn} readOnly />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="buttonalign">
            <button type="submit">Create</button>
          </div>
          <hr className="black-line"></hr>
        </form>
      </div>
      <div className="join-team">
        <h2 id="h2">Join team</h2>
        <ul>
          {availableTeams.map((team) => (
            <li key={team.teamID}>
              {team.teamName} - Members: {team.memberCount}
              <button onClick={() => handleJoinClick(team.teamID)}>Join</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
