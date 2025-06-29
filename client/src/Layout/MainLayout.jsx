import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const MainLayout = () => {
  return (
    <div>
      <Navbar /> {/* Ensure Navbar is defined and imported */}
      <main>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default MainLayout;