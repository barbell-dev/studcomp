import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components
import Home from "./Home";
import Signup from "./Signup";
import Profile from "./Profile";
import Domains from "./Domains";
import Projects from "./Projects";
import Teams from "./Teams";
import Techstack from "./Techstack";
import store from "./store.js"; // Replace './store' with the actual path to your Redux store file.

import { Provider } from "react-redux"; // Import Provider from Redux

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use 'element' prop */}
          <Route path="/signup" element={<Signup />} />{" "}
          <Route path="/profile" element={<Profile />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/techstack" element={<Techstack />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
