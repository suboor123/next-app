import Heading from "@/components/heading";
import Badge from "@/components/tag";
import { Tag } from "@/types/types";
import Image from "next/image";
import React from "react";
import styles from "./About.module.css";

type Props = {
  skills: Tag[];
};

const Capabilities = (props: Props) => {
  const { skills } = props;
  return (
    <>
      <div className="post-header mt-3">
        <div className="title">
          <hr />
          <Heading>{"Capabilities"}</Heading>
          <hr />
        </div>
        <div className={styles.capabilities}>
          {skills.map((s) => (
            <div key={s.id}>
              <Badge>
                <Image
                  src={s.imageUrl}
                  alt={s.description}
                  height={20}
                  width={20}
                />{" "}
                {s.name}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Capabilities;
