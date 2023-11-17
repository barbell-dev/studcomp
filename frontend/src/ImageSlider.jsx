// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const ImageSlider = ({ domains }) => {
//   return (
//     <Carousel>
//       {domains.map((domain) => (
//         <div key={domain.name}>
//           <img src={domain.imageUrl} alt={domain.name} />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default ImageSlider;

// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const ImageSlider = ({ domains }) => {
//   const sliderStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "400px", // Set a specific height for the images
//     width: "80%", // Set a specific width for the slider container
//     margin: "0 auto", // Center the slider horizontally
//   };

//   const imageStyle = {
//     maxWidth: "100%",
//     maxHeight: "100%",
//     objectFit: "contain", // Maintain aspect ratio
//   };

//   return (
//     <div style={sliderStyle}>
//       <Carousel showThumbs={false}>
//         {domains.map((domain) => (
//           <div key={domain.name}>
//             <img
//               src={domain.imageUrl}
//               alt={domain.name}
//               style={imageStyle}
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default ImageSlider;

import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({ domains, onImageChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sliderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px", // Set a specific height for the images
    width: "80%", // Set a specific width for the slider container
    margin: "0 auto", // Center the slider horizontally
  };

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain", // Maintain aspect ratio
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
    // Trigger the callback function provided by the parent component
    onImageChange(index);
  };

  return (
    <div style={sliderStyle}>
      <Carousel showThumbs={false} onChange={handleImageChange} selectedItem={currentImageIndex}>
        {domains.map((domain) => (
          <div key={domain.name}>
            <img src={domain.imageUrl} alt={domain.name} style={imageStyle} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
