import React from "react";

const Skeleton = () => {
  return (
    <div role="status" className="space-y-2.5 animate-pulse w-full">

      {[...Array(15)].map((_, index) => (
        <div key={index} className="flex items-center w-full">
          <div className="h-2.5 w-32 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-2.5 ms-2 w-24 bg-gray-300 rounded-full dark:bg-gray-600"></div>
          <div className="h-2.5 ms-2 flex-1 bg-gray-300 rounded-full dark:bg-gray-600"></div>
        </div>
      ))}

      <div className="flex items-center w-full">
        <div className="h-2.5 w-full bg-gray-300 rounded-full dark:bg-gray-700"></div>
      </div>

      <div className="flex items-center w-full">
        <div className="h-2.5 w-80 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="h-2.5 ms-2 flex-1 bg-gray-300 rounded-full dark:bg-gray-600"></div>
      </div>

      <div className="flex items-center w-full">
        <div className="h-2.5 w-40 bg-gray-300 rounded-full dark:bg-gray-700"></div>
        <div className="h-2.5 ms-2 w-24 bg-gray-200 rounded-full dark:bg-gray-600"></div>
        <div className="h-2.5 ms-2 flex-1 bg-gray-300 rounded-full dark:bg-gray-600"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;


