import React from "react";

const SectionHeading = ({ title = "", description = "" }) => {
  return (
    <div className="px-5 md:px-0">
      <h1 className="text-xl md:text-5xl font-bold text-gray-800 pt-10">
        {title}
      </h1>
      <p className="text-sm md:text-md font-light text-gray-700 mt-2">
        {description}
      </p>
    </div>
  );
};

export default SectionHeading;
