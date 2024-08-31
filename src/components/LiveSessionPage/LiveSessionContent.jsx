import React, { Fragment } from "react";
import SectionHeading from "../SectionHeading";
import Card from "../Card";
import LiveSessionCard from "./LiveSessionCard";

const LiveSessionContent = ({ sessions = [] }) => {
  return (
    <div className="w-full md:w-[50%] mx-[100px] relative overflow-hidden  py-0 md:py-20">
      <SectionHeading
        title="Live Sessions & Webinars: Engage with Expert Talks and Tutorials"
        description="Join me for live sessions and webinars covering the latest trends and techniques in web and mobile development. Participate in interactive discussions, coding tutorials, and Q&A sessions to enhance your skills and stay updated with industry advancements."
      />
      <div className="bg-slate-100 p-3 my-5 rounded-md">
        <iframe
          id="session-iframe"
          className="h-[250px] md:h-[400px] rounded-md"
          src="https://www.youtube.com/embed/lXFgS8vbej4?enablejsapi=1"
          width="100%"
        />
      </div>
      <div className="mt-5 px-5 md:px-0">
        {sessions.map((blog, idx) => (
          <Fragment key={`blog-${idx}`}>
            <LiveSessionCard blog={blog} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default LiveSessionContent;
