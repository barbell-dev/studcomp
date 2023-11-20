import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./userSlice";
import Login from "./Login";

function Profile() {
  const user = useSelector((state) => state.user);
  const [updatedData, setUpdatedData] = useState({
    email: user?.email || "",
    password: user?.password || "",
    srn: user?.srn || "",
    gender: user?.gender || "Male",
    campus: user?.campus || "RR",
    cgpa: user?.cgpa || "",
    name: user?.name || "",
    githubLink: user?.githubLink || "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedData({
      email: user?.email || "",
      password: user?.password || "",
      srn: user?.srn || "",
      gender: user?.gender || "Male",
      campus: user?.campus || "RR",
      cgpa: user?.cgpa || "",
      name: user?.name || "",
      githubLink: user?.githubLink || "",
    });
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (updatedData.password.length < 6) {
      alert("Password length has to be greater than or equal to 6.");
      return;
    }
    if (isNaN(updatedData.cgpa)) {
      alert("CGPA should be a numeric value.");
      return;
    }
    if (!updatedData.githubLink.startsWith("https://github.com/")) {
      alert("Invalid Github link.");
      return;
    }
    if (updatedData.githubLink.startsWith("https://github.com/")) {
      const username = updatedData.githubLink.split("/").pop();
      const apiUrl = `https://api.github.com/users/${username}`;
      try {
        const response_1 = await axios.get(apiUrl);
        if (!response_1.status === 200) {
          alert("User does not exist or error in processing the github link.");
          return;
        }
      } catch (error) {
        alert("User does not exist or error in processing the github link.");
        return;
      }
    }
    try {
      const response = await axios.put(
        "http://localhost:3000/api/update-profile",
        updatedData
      );

      if (response.status === 200) {
        console.log("Profile updated successfully!");
        alert("Profile updated successfully!");
        dispatch(setUser(updatedData));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        // Add your API call to delete the user account from the database
        const response = await axios.delete(
          "http://localhost:3000/api/delete-account",
          { data: { srn: user.srn } }
        );

        // Clear user data from Redux store
        // dispatch(clearUser());

        // Display alert for successful deletion
        if (response.status === 200) {
          alert("Account has been deleted.");
          // history.push("/");
          // Redirect to the login page
          window.location.href = "/";
        } else {
          alert("Error in deleting the account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account. Please try again.");
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <Navbar />
      <div className="form-profile-container">
        <form
          className="form-profile form-profile-border"
          onSubmit={handleUpdate}
        >
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={updatedData.email}
              onChange={handleInputChange}
            />
            <i className="fa fa-pencil edit-icon"></i>
          </div>

          <br />
          <div className="password">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={updatedData.password}
              onChange={handleInputChange}
            />
            <i className="fa fa-pencil edit-icon"></i>
          </div>

          <br />
          <div>
            <label>SRN</label>
            <input
              type="text"
              name="srn"
              placeholder="Enter SRN"
              value={updatedData.srn}
              onChange={handleInputChange}
              readOnly
            />
            <i className="fa fa-pencil edit-icon"></i>
          </div>

          <br />
          <div>
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              required
              checked={updatedData.gender === "Male"}
              onChange={handleInputChange}
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              required
              checked={updatedData.gender === "Female"}
              onChange={handleInputChange}
            />
            <label>Female</label>
          </div>

          <br />
          <div>
            <label>Campus:</label>
            <input
              type="radio"
              name="campus"
              value="RR"
              required
              checked={updatedData.campus === "RR"}
              onChange={handleInputChange}
            />
            <label>RR</label>
            <input
              type="radio"
              name="campus"
              value="EC"
              required
              checked={updatedData.campus === "EC"}
              onChange={handleInputChange}
            />
            <label>EC</label>
            <input
              type="radio"
              name="campus"
              value="HN"
              required
              checked={updatedData.campus === "HN"}
              onChange={handleInputChange}
            />
            <label>HN</label>
            <i className="fa fa-pencil edit-icon"></i>
          </div>

          <br />
          <div>
            <label>CGPA</label>
            <input
              type="text"
              name="cgpa"
              placeholder="Enter CGPA"
              value={updatedData.cgpa}
              onChange={handleInputChange}
            />
            <i className="fa fa-pencil edit-icon"></i>
          </div>

          <br />
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={updatedData.name}
              onChange={handleInputChange}
            />
            <i className="fa fa-pencil edit-icon"></i>
          </div>

          <br />
          <div>
            <label>Github Link</label>
            <input
              type="text"
              name="githubLink"
              placeholder="Enter GitHub Link"
              value={updatedData.githubLink}
              onChange={handleInputChange}
            />
            <i className="fa fa-pencil edit-icon"></i>
          </div>

          <br />
          <div className="lastbuttons">
            <label>
              <input type="submit" value="Update" required />
            </label>
            <label>
              <input
                type="button"
                value="Delete User"
                className="delete"
                onClick={handleDelete}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
