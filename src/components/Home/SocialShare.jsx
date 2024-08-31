import React from "react";

const SocialShare = () => {
  return (
    <div className="flex gap-5 my-6 items-center">
      <a href="https://www.instagram.com/suboork_100/" target="_blank">
        <img className="h-6 object-cover" src="/assets/insta.png" />
      </a>
      <a
        href="https://www.linkedin.com/in/suboor-khan-314136158/"
        target="_blank"
      >
        <img className="h-6 object-cover" src="/assets/linkedin.png" />
      </a>
      <a href="https://github.com/suboor123" target="_blank">
        <img className="h-6 object-cover" src="/assets/git.png" />
      </a>
      <a href="mailto:suboork100@gmail.com" target="_blank">
        <img className="h-6 object-cover" src="/assets/email.png" />
      </a>
      <a href="mailto:suboork100@gmail.com" target="_blank">
        <img className="h-7 object-cover" src="/assets/upwork.png" />
      </a>
    </div>
  );
};

export default SocialShare;
