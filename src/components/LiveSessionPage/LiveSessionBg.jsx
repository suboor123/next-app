import React from "react";

const LiveSessionBg = () => {
  return (
    <div className="w-full  relative md:fixed right-0 top-0 md:w-[40%] z-1">
      <img
        className="w-[100%] object-cover h-[300px] md:h-[100vh] filter grayscale transition-filter duration-500 hover:filter-none"
        src={"/assets/ai.jpg"}
      />
    </div>
  );
};

export default LiveSessionBg;
