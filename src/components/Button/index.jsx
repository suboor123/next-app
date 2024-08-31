import React from "react";

const Button = ({ children, url, className="" }) => {
  return (
    <a
      href={url}
      className={`block  border border-black text-white bg-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out cursor-pointer font-poppins py-2 px-5 rounded-md text-center ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;
