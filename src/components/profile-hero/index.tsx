import { Profile, Tag } from "@/types/types";
import React from "react";
import Image from "next/image";
import styles from './Profile.module.css';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



type Props = {
  profile: Profile;
  skills: Tag[]
};

const ProfileHero: React.FC<Props> = ({ profile }) => {

  return (
    <article className="post">
      <div className="post-header">
        <h2 className="title">
          <a href="single.html">Suboor Khan - Creative Web & Mobile app Developer</a>
        </h2>

      </div>
      <div className={"post-media text-center"}>
          <Image
            src={profile.imageUrl}
            alt={`${profile.name} - ${profile.aboutMe}`}
            height={500}
            width={500}
            priority
          />
      </div>
      <div className="post-content">
        <div className="the-excerpt">
          <p>{profile.aboutMe} </p>
        </div>
      </div>
      <div className="read-more">
        <a href="single.html">Continue Reading ...</a>
      </div>
    </article>
  );
};

export default ProfileHero;
