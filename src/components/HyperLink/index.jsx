import React from "react";

const HyperLink = ({
  href,
  title,
  children,
  fontSize = "md",
  type = "normal",
  className = "",
  rounded = "full",
  py = "2",
  ...props
}) => {
  const commonClassName = `font-poppins  rounded-${rounded}  flex items-center  justify-center font-light gap-2  tracking-wider cursor-pointer  py-${py} px-5 flex items-center justify-center gap-2 text-${fontSize} tracking-wider cursor-pointer `;

  /** Renders normal button */
  if (type === "normal")
    return (
      <a
        href={href}
        title={title}
        className={`${commonClassName} bg-primary text-white hover:bg-primaryDark transition duration-200 ${className}`}
        {...props}
      >
        {children}
      </a>
    );

  /** Renders outline button */
  if (type === "outline")
    return (
      <a
        href={href}
        title={title}
        className={`${commonClassName} border border-gray-400 hover:border-primary hover:text-primary transition duration-200 text-gray-500  ${className}`}
        {...props}
      >
        {children}
      </a>
    );
};

export default HyperLink;
