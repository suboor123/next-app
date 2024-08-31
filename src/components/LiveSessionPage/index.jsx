import { getSiteData } from "@/data/getSiteData";
import React from "react";
import LiveSessionContent from "./LiveSessionContent";
import LiveSessionBg from "./LiveSessionBg";
import { BackgroundHero } from "../Background";

const LiveSessionPage = () => {
  const sessions = getSiteData("sessions") || [];

  return (
    <section className="flex gap-0 flex-col-reverse md:gap-0 items-center  md:flex-row  relative overflow-hidden py-5 md:py-0">
      <BackgroundHero />
      <LiveSessionContent sessions={sessions} />
      <LiveSessionBg />
    </section>
  );
};

export default LiveSessionPage;
