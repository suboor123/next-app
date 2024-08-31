import React from "react";
import LazyImg from "../LazyImg";
import Button from "../Button";

const LiveSessionCard = ({ blog = {} }) => {
  const { imageUrl, name, description, url } = blog;
  const title = name;

  return (
    <a className="flex my-5 gap-5 border-dashed border-2 p-3 scale2">
      <LazyImg
        src={imageUrl}
        className="w-[150px] h-[150px] min-w-[150px] min-h-[150px] bg-gray-400 rounded-md object-cover"
      />
      <div>
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-sm font-light multiline-ellipsis-4">{description}</p>
      </div>
    </a>
  );
};

export default LiveSessionCard;
