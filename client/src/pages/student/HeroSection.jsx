import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:to-gray-900 py-20 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find The Best Course For You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Explore a variety of courses tailored to your needs and start your
          learning journey today!
        </p>
        <form action="" className="flex items-center justify-center gap-0">
          <div className="flex items-center bg-white rounded-l-full shadow-lg overflow-hidden max-w-xl w-full dark:bg-gray-800">
            <input
              type="text"
              placeholder="Search for courses..."
              className="flex-grow bg-transparent border-none focus-visible:ring-0 px-6 py-2.5 text-lg text-black dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-r-full shadow-lg hover:bg-blue-600 transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Search
          </button>
        </form>
        <button
          className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition duration-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 mt-6"
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
