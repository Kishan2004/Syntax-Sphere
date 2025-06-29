import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  return (
    <>
      {/* Fixed Sidebar aligned below navbar (assumed 60px height) */}
      <div className="fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[250px] bg-gray-100 border-r border-gray-300 p-5 z-10">
        {/* Navigation */}
        <div className="space-y-4">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <span>Dashboard</span>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <span>Courses</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[250px] mt-[60px] p-6 min-h-[calc(100vh-60px)]">
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
