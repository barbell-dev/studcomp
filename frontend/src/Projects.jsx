// import React, { useState } from 'react';
// import './Projects.css';
// import Navbar from './Navbar';

// export default function Projects() {
//   const [projectName, setProjectName] = useState('');
//   const [domainId, setDomainId] = useState('');

//   const handleProjectNameChange = (e) => {
//     setProjectName(e.target.value);
//   };

//   const handleDomainIdChange = (e) => {
//     setDomainId(e.target.value);
//   };

//   const handleAddProject = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/addProject', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ projectName, domainId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Project added successfully:', data);
//         // Optionally, you can reset the input fields after a successful addition
//         setProjectName('');
//         setDomainId('');
//       } else {
//         console.error('Failed to add project:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding project:', error.message);
//     }
//   };

//   return (
//     <div className="projects">
//       <header>
//         <h1>Projects</h1>
//       </header>
//       <Navbar />
//       <div className="add-projects">
//         <h2>Add Projects</h2>
//         <div className="input-fields">
//           <label htmlFor="projectName">Project Name:</label>
//           <input
//             type="text"
//             id="projectName"
//             value={projectName}
//             onChange={handleProjectNameChange}
//           />
//           <label htmlFor="domainId">Domain ID:</label>
//           <input
//             type="text"
//             id="domainId"
//             value={domainId}
//             onChange={handleDomainIdChange}
//           />
//         </div>
//         <div className="buttonalign">
//           <button onClick={handleAddProject}>ADD</button>
//         </div>
//         <hr className="black-line" />
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import './Projects.css';
// import Navbar from './Navbar';

// export default function Projects() {
//   const [projectName, setProjectName] = useState('');
//   const [domainId, setDomainId] = useState('');
//   const [searchBy, setSearchBy] = useState('projectName');

//   const handleProjectNameChange = (e) => {
//     setProjectName(e.target.value);
//   };

//   const handleDomainIdChange = (e) => {
//     setDomainId(e.target.value);
//   };

//   const handleSearchByChange = (e) => {
//     setSearchBy(e.target.value);
//   };

//   const handleAddProject = async () => {
//     // Code for adding a project (you can keep your existing implementation here)
//   };

//   const handleFindProjects = async () => {
//     // Logic to find projects based on selected search criteria (projectName or domainId)
//     // Implement this function to fetch projects based on the selected criteria
//     console.log('Searching projects by:', searchBy);
//     console.log('Project Name:', projectName);
//     console.log('Domain ID:', domainId);
//   };

//   return (
//     <div className="projects">
//       <header>
//         <h1>Projects</h1>
//       </header>
//       <Navbar />
//       <div className="add-projects">
//         <h2>Add Projects</h2>
//         <div className="input-fields">
//           <label htmlFor="projectName">Project Name:</label>
//           <input
//             type="text"
//             id="projectName"
//             value={projectName}
//             onChange={handleProjectNameChange}
//           />
//           <label htmlFor="domainId">Domain ID:</label>
//           <input
//             type="text"
//             id="domainId"
//             value={domainId}
//             onChange={handleDomainIdChange}
//           />
//         </div>
//         <div className="buttonalign">
//           <button onClick={handleAddProject}>ADD</button>
//         </div>
//         <hr className="black-line" />

//         <h2>Find Your Projects</h2>
//         <div className="search-by">
//           <label>
//             <input
//               type="radio"
//               value="projectName"
//               checked={searchBy === 'projectName'}
//               onChange={handleSearchByChange}
//             />
//             Search by Project Name
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="domainId"
//               checked={searchBy === 'domainId'}
//               onChange={handleSearchByChange}
//             />
//             Search by Domain ID
//           </label>
//         </div>
//         <div className="buttonalign">
//           <button onClick={handleFindProjects}>Find Projects</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import './Projects.css';
// import Navbar from './Navbar';

// export default function Projects() {
//   const [projectName, setProjectName] = useState('');
//   const [domainId, setDomainId] = useState('');
//   const [searchBy, setSearchBy] = useState('projectName');
//   const [searchInput, setSearchInput] = useState('');

//   const handleProjectNameChange = (e) => {
//     setProjectName(e.target.value);
//   };

//   const handleDomainIdChange = (e) => {
//     setDomainId(e.target.value);
//   };

//   const handleSearchByChange = (e) => {
//     setSearchBy(e.target.value);
//     setSearchInput(''); // Reset the search input when changing search criteria
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleAddProject = async () => {
//     // Code for adding a project (you can keep your existing implementation here)
//   };

//   const handleFindProjects = async () => {
//     // Logic to find projects based on selected search criteria (projectName or domainId)
//     // Implement this function to fetch projects based on the selected criteria
//     console.log('Searching projects by:', searchBy);
//     console.log('Search Input:', searchInput);
//   };

//   return (
//     <div className="projects">
//       <header>
//         <h1>Projects</h1>
//       </header>
//       <Navbar />
//       <div className="add-projects">
//         <h2>Add Projects</h2>
//         <div className="input-fields">
//           <label htmlFor="projectName">Project Name:</label>
//           <input
//             type="text"
//             id="projectName"
//             value={projectName}
//             onChange={handleProjectNameChange}
//           />
//           <label htmlFor="domainId">Domain ID:</label>
//           <input
//             type="text"
//             id="domainId"
//             value={domainId}
//             onChange={handleDomainIdChange}
//           />
//         </div>
//         <div className="buttonalign">
//           <button onClick={handleAddProject}>ADD</button>
//         </div>
//         <hr className="black-line" />

//         <h2>Find Your Projects</h2>
//         <div className="search-by">
//           <label>
//             <input
//               type="radio"
//               value="projectName"
//               checked={searchBy === 'projectName'}
//               onChange={handleSearchByChange}
//             />
//             Search by Project Name
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="domainId"
//               checked={searchBy === 'domainId'}
//               onChange={handleSearchByChange}
//             />
//             Search by Domain ID
//           </label>
//         </div>
//         <div className="input-fields">
//           <input
//             type="text"
//             placeholder={`Enter ${searchBy === 'projectName' ? 'Project Name' : 'Domain ID'}`}
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//         </div>
//         <div className="buttonalign">
//           <button onClick={handleFindProjects}>Find</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import './Projects.css';
// import Navbar from './Navbar';

// export default function Projects() {
//   const [projectName, setProjectName] = useState('');
//   const [domainId, setDomainId] = useState('');
//   const [searchBy, setSearchBy] = useState('projectName');
//   const [searchInput, setSearchInput] = useState('');
//   const [searchResult, setSearchResult] = useState([]);
//   const [noResult, setNoResult] = useState(false);

//   const handleProjectNameChange = (e) => {
//     setProjectName(e.target.value);
//   };

//   const handleDomainIdChange = (e) => {
//     setDomainId(e.target.value);
//   };

//   const handleSearchByChange = (e) => {
//     setSearchBy(e.target.value);
//     setSearchInput(''); // Reset the search input when changing search criteria
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleAddProject = async () => {

//     // Code for adding a project (you can keep your existing implementation here)
//         try {
//       const response = await fetch('http://localhost:3000/api/addProject', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ projectName, domainId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Project added successfully:', data);
//         // Optionally, you can reset the input fields after a successful addition
//         setProjectName('');
//         setDomainId('');
//       } else {
//         console.error('Failed to add project:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding project:', error.message);
//     }
//   };

//   const handleFindProjects = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/findProjects', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           searchBy,
//           searchText: searchInput,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.length === 0) {
//           setNoResult(true);
//           setSearchResult([]);
//         } else {
//           setNoResult(false);
//           setSearchResult(data);
//         }
//       } else {
//         console.error('Failed to find projects:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error finding projects:', error.message);
//     }
//   };

//   return (
//     <div className="projects">
//       <header>
//         <h1>Projects</h1>
//       </header>
//       <Navbar />
//       <div className="add-projects">
//         <h2>Add Projects</h2>
//         <div className="input-fields">
//           <label htmlFor="projectName">Project Name:</label>
//           <input
//             type="text"
//             id="projectName"
//             value={projectName}
//             onChange={handleProjectNameChange}
//           />
//           <label htmlFor="domainId">Domain ID:</label>
//           <input
//             type="text"
//             id="domainId"
//             value={domainId}
//             onChange={handleDomainIdChange}
//           />
//         </div>
//         <div className="buttonalign">
//           <button onClick={handleAddProject}>ADD</button>
//         </div>
//         <hr className="black-line" />

//         <h2>Find Your Projects</h2>
//         <div className="search-by">
//           <label>
//             <input
//               type="radio"
//               value="projectName"
//               checked={searchBy === 'projectName'}
//               onChange={handleSearchByChange}
//             />
//             Search by Project Name
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="domainId"
//               checked={searchBy === 'domainId'}
//               onChange={handleSearchByChange}
//             />
//             Search by Domain ID
//           </label>
//         </div>
//         <div className="input-fields">
//           <input
//             type="text"
//             placeholder={`Enter ${searchBy === 'projectName' ? 'Project Name' : 'Domain ID'}`}
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//         </div>
//         <div className="buttonalign">
//           <button onClick={handleFindProjects}>Find</button>
//         </div>
//         <div className="search-result">
//           {noResult ? (
//             <p>The project doesn't exist.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Project Name</th>
//                   <th>Domain ID</th>
//                   {/* Add more table headers as needed */}
//                 </tr>
//               </thead>
//               <tbody>
//               {searchResult.map((project, index) => (
//                  <tr key={index}>
//                  <td>{project.projectName}</td>
//                  <td>{project.domainId}</td>
//                  {/* Add more table data as needed */}
//                 </tr>
//                ))}

//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import "./Projects.css";
import Navbar from "./Navbar";

export default function Projects() {
  const [projectName, setProjectName] = useState("");
  const [domainId, setDomainId] = useState("");
  const [searchBy, setSearchBy] = useState("projectName");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [allProjects, setAllProjects] = useState([]);

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDomainIdChange = (e) => {
    setDomainId(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearchInput(""); // Reset the search input when changing search criteria
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleAddProject = async () => {
    // Code for adding a project (you can keep your existing implementation here)
    try {
      const response = await fetch("http://localhost:3000/api/addProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectName, domainId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Project added successfully:", data);
        // Optionally, you can reset the input fields after a successful addition
        setProjectName("");
        setDomainId("");
      } else {
        console.error("Failed to add project:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding project:", error.message);
    }
  };

  const handleFindProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/findProjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchBy,
          searchText: searchInput,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("what's tf in data");
        if (data.length === 0) {
          setNoResult(true);
          setSearchResult([]);
        } else {
          setNoResult(false);
          setSearchResult(data[0]);
          console.log(setSearchResult);
        }
      } else {
        console.error("Failed to find projects:", response.statusText);
      }
    } catch (error) {
      console.error("Error finding projects:", error.message);
    }
  };
  const fetchAllProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getUserProjects");

      if (response.ok) {
        const data = await response.json();
        console.log("All projects:", data);
        setAllProjects(data); // Set fetched projects to state
      } else {
        console.error("Failed to fetch projects:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  useEffect(() => {
    fetchAllProjects(); // Fetch projects when the component mounts
  }, []); // Empty dependency array to execute only once on component mount

  return (
    <div className="projects">
      <header>
        <h1>Projects</h1>
      </header>
      <Navbar />
      <div className="add-projects">
        <h2>Add Projects</h2>
        <div className="input-fields">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={handleProjectNameChange}
          />
          <label htmlFor="domainId">Domain ID:</label>
          <input
            type="text"
            id="domainId"
            value={domainId}
            onChange={handleDomainIdChange}
          />
        </div>
        <div className="buttonalign">
          <button onClick={handleAddProject}>ADD</button>
        </div>
        {/* Add input fields and button for adding projects */}
        <hr className="black-line" />

        <h2>Find Your Projects</h2>
        <div className="search-by">
          <label>
            <input
              type="radio"
              value="projectName"
              checked={searchBy === "projectName"}
              onChange={handleSearchByChange}
            />
            Search by Project Name
          </label>
          <label>
            <input
              type="radio"
              value="domainId"
              checked={searchBy === "domainId"}
              onChange={handleSearchByChange}
            />
            Search by Domain ID
          </label>
        </div>
        <div className="input-fields">
          <input
            type="text"
            placeholder={`Enter ${
              searchBy === "projectName" ? "Project Name" : "Domain ID"
            }`}
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>

        {/* Add radio buttons and search input */}
        <div className="buttonalign">
          <button onClick={handleFindProjects}>Find</button>
        </div>
        <div className="search-result">
          {noResult ? (
            <p>The project doesn't exist.</p>
          ) : (
            <div>
              <p>{searchResult.projectName}</p>
              {searchResult.length > 0 &&
                searchResult.map((result, index) => (
                  <div key={index} className="result-item">
                    <h3>Project Name: {result.projectName}</h3>
                    <p>DomainName:{result.domainName}</p>
                    {/* Add more fields if necessary */}
                  </div>
                ))}
            </div>
          )}
        </div>
        <hr className="black-line" />
        <h2>Your Projects</h2>
        <div className="search-result">
          {allProjects.length > 0 ? (
            allProjects.map((project, index) => (
              <div key={index} className="result-item">
                <h3>Project Name: {project.projectName}</h3>
                <p>Domain Name: {project.domainName}</p>
                {/* Add more fields if necessary */}
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
        <hr className="black-line" />
      </div>
    </div>
  );
}
// {searchResult.map((project, index) => (
//   <div key={index} className="project-details">
//     <p><strong>Project Name:</strong> {project.domainName}</p>
//     <p><strong>Domain ID:</strong> {project.projectName}</p>
//     {/* Add more details here */}
//   </div>
// ))}
