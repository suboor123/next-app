import { APP_TITLE } from "@/constants";
import React from "react";

const ImageContent = () => {
  return (
    <div className="absolute md:hidden w-full p-5 bottom-[100px] left-0 transform translate-y-1/2 bg-black bg-opacity-40 text-white flex flex-col items-center justify-center">
      <h2 className="text-4xl font-semibold mb-2">Suboor Khan</h2>
      <p className="text-sm font-light text-center">
        A skilled Web & Mobile Developer with over 4 years of experience in
        delivering impactful web solutions. Specializing in fullstack
        development, I design, develop, and test web applications across various
        industries. Discover my projects and skills in modern web technologies.
      </p>
    </div>
  );
};

const HomeImage = ({ src = "/assets/me.jpg", className = '' }) => {
  return (
    <div className={`w-full md:w-[50%] z-50 relative overflow-hidden ${className}`}>
      <img
        title={APP_TITLE}
        alt={APP_TITLE}
        className="w-[100%] object-cover h-[70vh] md:h-[100vh] filter grayscale transition-filter duration-500 hover:filter-none pt-10 md:py-0"
        src={src}
      />
      <ImageContent />
    </div>
  );
};

export default HomeImage;
