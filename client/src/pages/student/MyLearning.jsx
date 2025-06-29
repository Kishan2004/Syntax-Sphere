import React from "react";
import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [1,2];
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <p>You are not enrolled in any course</p>
        ) : (
          <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{[1, 2].map((course, index) => <Course key={index} />)}</div>
        )}
      </div>
    </div>
  );
};

const MyLearningSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex space-x-4">
            <div className="h-24 w-24 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning;
