// import Navbar from "./Navbar";
// import "./Domains.css";
// export default function Domains() {
//   return (
//     <div className="domains">
//       <header>
//         <h1>Domains</h1>
//       </header>
//       <Navbar />
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import ImageSlider from "./ImageSlider"; // Import your ImageSlider component
import "./Domains.css";

export default function Domains() {
  const [selectedDomain, setSelectedDomain] = useState({
    name: "",
    description: "",
  });

  const domains = [
    {
      name: "Artificial Intelligence",
      imageUrl: "https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Data Science and Big Data",
      imageUrl:"https://img-c.udemycdn.com/course/750x422/3523010_aaad.jpg",
    },
    {
      name: "Cybersecurity and Information Assurance",
      imageUrl:"https://caricom.org/wp-content/uploads/data-security-caricom.jpg",
    },
    {
      name: "Software Development and Engineering",
      imageUrl:"https://shecancode.io/wp-content/uploads/2022/01/software-engineer-vs-developer-word-cloud.png",
    },
    {
      name: "Computer Networks and Communications",
      imageUrl:"https://edurev.gumlet.io/ApplicationImages/Temp/59_3286cbae-92d8-4767-a7c8-80278ff80fff_lg.jpg",
    },
    {
      name: "Cloud Computing",
      imageUrl:"https://i0.wp.com/www.integralchoice.com/wp-content/uploads/2021/12/cloud-computing.jpg",
    },
    {
      name: "Human-Computer Interaction (HCI)",
      imageUrl:"https://www.analyticssteps.com/backend/media/thumbnail/3241914/7830629_1623925422_computer%20interactionArtboard%201.jpg",
    },
    {
      name: "Computer Vision and Image Processing",
      imageUrl:"https://editor.analyticsvidhya.com/uploads/90576computer-vision-and-image-processing1642421266.jpeg",
    },
    {
      name: "Robotics",
      imageUrl:"https://www.dhl.com/content/dam/dhl/global/delivered/images/smart-grid-press-1375x504/d101-dl-robot-revolution.web.648.366.jpg",
    },
    {
      name: "Databases and Information Retrieval",
      imageUrl:"https://miro.medium.com/max/3840/1*zIko_UJAnI5oOI7f9Dwacw.png",
    },
    // Add more domain objects with respective image URLs
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index

  useEffect(() => {
    const fetchDomainInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/domains");
        const data = await response.json();
        // Update selectedDomain state based on the currentImageIndex
        setSelectedDomain(data[currentImageIndex]);
      } catch (error) {
        console.error("Error fetching domain info:", error);
      }
    };

    // Call fetchDomainInfo function whenever the image slider changes
    // Here you can use the index of the selected image in the ImageSlider component
    // and update the selected domain accordingly
    fetchDomainInfo();
  }, [currentImageIndex,setSelectedDomain]);
  const handleImageChange = (index) => {
    // Update the current image index when the ImageSlider changes
    setCurrentImageIndex(index);
    console.log(currentImageIndex)
  };

  return (
    <div className="domains">
      <header>
        <h1>Domains</h1>
      </header>
      <Navbar />
      <div className="image-slider-container">
        <ImageSlider domains={domains} onImageChange={handleImageChange} /> {/* Include the ImageSlider component */}
        <div className="domain-info">
        <h2>{selectedDomain.DomainName}</h2>
        <p>{selectedDomain.DomainDescription}</p>
      </div>
      </div>

    </div>
  );
}

