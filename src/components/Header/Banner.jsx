"use client";
import React, { useEffect, useState } from "react";

const USER_SEEN_BANNER = "HAS_USER_SEEN_BANNER";

const Banner = () => {
  const [showBanner, setShowBanner] = useState(true);

  const closeBanner = () => {
    localStorage.setItem(USER_SEEN_BANNER, "true");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="relative md:hidden text-black justify-between text-xs isolate flex items-center gap-x-6 overflow-hidden bg-blue-50 px-3 md:px-24 py-2.5">
          <div className="flex gap-3 items-center">
            <p>
              <span className="font-extrabold">20%</span> discount for your
              first project
            </p>
            <a
              href={"/hire-us"}
              className="bg-animated text-xs rounded-full px-3 py-1 text-white"
            >
              Get a Quote
            </a>
          </div>
          <button
            onClick={closeBanner}
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-5 w-5 text-black"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Banner;
