import React from "react";
import LazyImg from "../LazyImg";

const SocialShare = () => {
  return (
    <div className="flex gap-6 my-6 items-center">
      <a href="https://www.instagram.com/suboork_100/" target="_blank">
        <LazyImg className="h-6 object-cover" src="/assets/insta.png" />
      </a>
      <a
        href="https://www.linkedin.com/in/suboor-khan-314136158/"
        target="_blank"
      >
        <LazyImg className="h-6 object-cover" src="/assets/linkedin.png" />
      </a>
      <a href="https://github.com/suboor123" target="_blank">
        <LazyImg className="h-6 object-cover" src="/assets/git.png" />
      </a>
      <a href="mailto:suboork100@gmail.com" target="_blank">
        <LazyImg className="h-6 object-cover" src="/assets/email.png" />
      </a>
      <a href="mailto:suboork100@gmail.com" target="_blank">
        <LazyImg className="h-7 object-cover" src="/assets/upwork.png" />
      </a>
      <a
        href="https://wa.me/917011879824?text=Hello%20Suboor%2C%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
      >
        <LazyImg
          className="h-7 object-cover"
          src="/assets/whatsapp.png"
          alt="WhatsApp"
        />
      </a>
    </div>
  );
};

export default SocialShare;
