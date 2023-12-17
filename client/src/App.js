import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Error from "./components/Error";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import ProfessNav from "./ProfessionalCmp/ProfessNav";
import ProfessionalDash from "./components/ProfessionalDash";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/profe-dash" element={<ProfessionalDash />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
