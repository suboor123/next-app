import React from "react";
import Button from "../Button";
import LazyImg from "../LazyImg";

const HomeAbout = () => {
  return (
    <div className="w-full md:w-[50%] mx-[100px] relative overflow-hidden px-5 md:px-auto">
      <h1 className="text-3xl my-3 font-bold">
        Experienced Web & Mobile Solutions Architect
      </h1>
      <h2 className="text-md text-gray-600 my-3 font-light">
        Hi there! 👋 I'm <b className="font-bold">Suboor Khan</b>, a passionate
        Web and Mobile Developer with over 4 years of experience crafting
        innovative web solutions. I thrive on turning complex challenges into
        user-friendly, effective solutions across diverse industries. With a
        keen eye for detail and a knack for staying up-to-date with the latest
        tech trends, I excel in designing, developing, and testing applications
        that not only meet but exceed client expectations.
      </h2>
      <p className="text-md text-gray-600 my-3 font-light">
        Currently, I’m contributing to cutting-edge projects at Hindustan Times
        as an SDE-II. I’m dedicated to creating intuitive and impactful digital
        experiences, and I'm always eager to collaborate on exciting new
        ventures. If you're interested in working together or just want to chat
        about technology, feel free to{" "}
        <a className="text-blue-500" href="mailto:suboorkk100@gmail.com">
          reach out via email
        </a>
        ,{" "}
        <a className="text-blue-500" href="/contact">
          drop me a message
        </a>
        , or connect through my social links above.
      </p>
      <div className="flex gap-5">
        <a href="">
          <img src="/assets/insta.png" />
        </a>
        <a href="">
          <img src="/assets/linkedin.png" />
        </a>
        <a href="">
          <img src="/assets/git.png" />
        </a>
      </div>
      <Button url="/about">Read More</Button>
    </div>
  );
};

export default HomeAbout;
