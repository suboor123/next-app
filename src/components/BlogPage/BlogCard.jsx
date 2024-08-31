import React from "react";
import LazyImg from "../LazyImg";

const BlogCard = ({ blog = {} }) => {
  const { imageUrl, name, description, url } = blog;
  const title = name;

  return (
    <a
      title={`${title} - ${description}`}
      href={url}
      className="font-poppins ml-auto mr-auto w-full  rounded-xl shadow group
             bg-white overflow-hidden border hover:shadow-xl hover:ring-2 hover:ring-primary p-1 relative scale"
    >
      <div className="flex flex-col items-center gap-2 justify-center py-10">
        <LazyImg
          className="w-[100%] h-[200px] object-cover"
          src={imageUrl}
          alt={`${title} services`}
          title={`${title} - ${description}`}
        />
        <h2 className="font-extrabold text-center text-gray-900 text-xl mb-2">
          {title}
        </h2>
        <p className="text-center text-sm font-light text-gray-600">
          {description}
        </p>
      </div>
    </a>
  );
};

export default BlogCard;
