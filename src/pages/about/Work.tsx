import { Profile } from "@/types/types";
import Heading from "@/components/heading";
import Badge from "@/components/tag";
import Image from "next/image";
import React from "react";
import styles from "./About.module.css";

type Props = {
  profile: Profile;
};

const Work = ({ profile }: Props) => {
  return (
    <div className="post-header mt-3">
      <div className="title">
        <hr />
        <Heading>{"Work History"}</Heading>
        <hr />
      </div>
      <div className={styles.workWrappr}>
        {profile.companies.map((c) => {
          return (
            <div className={styles.workCard} key={c.id}>
              <h2>{c.name} <span className={styles.currentlyWorking}>{c.currentlyWorking && (<Badge>Present</Badge>)}</span>
              {!c.currentlyWorking && <div className={styles.timeSpan}>from {c.from} to {c.to}</div>}
              </h2> 
              <p>{c.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Work;
