import { Profile, Tag } from "@/types/types";
import React from "react";
import Image from "next/image";
import styles from "./Profile.module.css";
import { VscDebugAll } from "react-icons/vsc";

type Props = {
  profile: Profile;
  skills: Tag[];
};

const ProfileHero: React.FC<Props> = ({ profile, skills }) => {
  return (
    <article className="post">
      <div className="post-header">
        <h2 className={`title ${styles.heroTitle}`}>
          Suboor Khan <hr /> Creative Web & Mobile app Developer
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
      <hr />
      <h4 className={styles.skillHeading}><VscDebugAll /> Capabilities</h4>
      <hr />
      <div className={styles.skills}>
        {skills.map((s) => (
          <span key={s.id}>
            <Image
              src={s.imageUrl}
              alt={s.imageUrl + " - " + s.description}
              height={30}
              width={30}
              priority
              quality={90}
            />
          </span>
        ))}
      </div>
      <div className="read-more">
        <a href="single.html">Continue Reading ...</a>
      </div>
    </article>
  );
};

export default ProfileHero;
