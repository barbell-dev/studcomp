// import "./Teams.css";
// import Navbar from "./Navbar";

// export default function Teams() {
//   return (
//     <div className="teams">
//       <header>
//         <h1>Teams</h1>
//       </header>
//       <Navbar />
//     </div>
//   );
// }

import React from "react";
import "./Teams.css";
import Navbar from "./Navbar";

import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./userSlice";

export default function Teams() {
  const user = useSelector((state) => state.user);

  return (
    <div className="teams">
      <header>
        <h1>Teams</h1>
      </header>
      <Navbar />
      <div className="create-team">
        <h2 id="h2">Create Team</h2>
        <form>
          <div className="input-fields">
            <label htmlFor="teamName">Team Name:</label>
            <input type="text" id="teamName" name="teamName" />
          </div>
          <div className="input-fields">
            <label htmlFor="domainID">Domain ID:</label>
            <input type="text" id="domainID" name="domainID" />
          </div>
          <div className="input-fields">
            <label htmlFor="srn">SRN:</label>
            <input type="text" id="srn" name="srn" value={user.srn} readOnly />
          </div>
          <div className="buttonalign">
            <button type="submit">Create</button>
          </div>
          <hr className="black-line"></hr>
        </form>
      </div>
    </div>
  );
}
