import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";







const App = () => {
  return (
        <Routes>
        <Route path="/" element={<Navigate replace to="/home"  />} />  {/* redirection */}
        <Route path="/home" element={<Header />} />
      </Routes>
  );
};

export default App;
