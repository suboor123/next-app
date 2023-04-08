import Heading from "@/components/heading";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import { Profile, Tag } from "@/types/types";
import React from "react";
import Image from "next/image";
import SocialConnect from "@/components/social-connect";
import Link from "next/link";
import Capabilities from "./Capabilities";
import Work from "./Work";

export async function getStaticProps() {
  const profile = await FirebaseHelper.syncMyProfile();
  const skills = await FirebaseHelper.syncAllTags();
  return {
    props: {
      profile,
      skills,
    },
  };
}

type Props = {
  profile: Profile;
  skills: Tag[];
};

const About = ({ profile, skills }: Props) => {
  return (
    <div className="posts-inner">
      <article className="post">
        <div className="post-header">
          <div className="title">
            <hr />
            <Heading>{"about me"}</Heading>
            <hr />
          </div>
        </div>
        <div className={"post-media text-center"}>
          <Image
            src={profile.imageUrl}
            alt={`${profile.name} - ${profile.aboutMe}`}
            height={500}
            width={500}
            priority
          />
          <hr />
          <SocialConnect profile={profile} size={20} />
          <hr />
          <p className="mt-2">
            Hi there! 👋 I am {profile.name}, creative thinker who is adept at
            coming up with real solutions that work for clients. With experience
            in a wide variety of software, system architectures and programming
            languages, I am always current with the latest developments in the
            software development world. I pride myself on optimizing function
            and providing solutions that are intuitive user-friendly, adaptable
            and effective.{" "}
          </p>
          <p>
            I am current work at{" "}
            <b>{profile.companies[0].name}</b> as{" "}
            <b>{profile.designation}</b>. If you want to work together,{" "}
            <a href="mailto:suboork100@gmail.com">send me an email</a>,{" "}
            <Link href="/contact">Write a message</Link> or visit one of the
            social links above.
          </p>
        </div>
        <Capabilities skills={skills} />
        <Work profile={profile} />
      </article>
    </div>
  );
};

export default About;
