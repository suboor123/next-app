import Head from "next/head";
import ListArticle from "@/components/list-article";
import { useMemo } from "react";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import { Blog, Profile, Project, Tag } from "@/types/types";
import Heading from "@/components/heading";
import Button from "@/components/button";
import styles from "./Home.module.css";
import { BsChevronRight } from "react-icons/bs";
import ProfileHero from "@/components/profile-hero";
import { useRouter } from "next/router";

// import TechCube from "@/components/animated/tech-cude";
import dynamic from "next/dynamic";
// const TechCube = dynamic(() => import('../components/animated/tech-cude'))

export async function getStaticProps() {
  const projects = await FirebaseHelper.syncAllProjects();
  const blogs = await FirebaseHelper.syncAllBlogs();
  const profile = await FirebaseHelper.syncMyProfile();
  const skills = await FirebaseHelper.syncAllTags();
  return {
    props: {
      projects: projects.slice(0, 4),
      blogs: blogs.slice(0, 4),
      profile,
      skills: skills.map(s => s.name)
    },
    revalidate: 86400,
  };
}

type Props = {
  projects: Project[];
  blogs: Blog[];
  profile: Profile;
  skills: string[]
};

export default function Home(props: Props) {
  const { projects, blogs, profile, skills } = props;
  const router = useRouter();

  const renderProjectsList = () => {
    const content = projects
      .filter((p) => p.description)
      .map((project) => {
        return {
          id: project.id,
          heading: project.name,
          createdAt: project.createdAt,
          tags: project.tags.map((p: any) => p.name),
          views: project.views,
          content: project.description,
          imageUrl: project.imageUrl,
        };
      })
    return <ListArticle content={content} handleArticleClick={(id) => {
      router.push(`/projects/${id}`)
    }} />;
  };

  const renderBlogList = () => {
    const content = blogs
      .filter((p) => p.description)
      .map((blog) => {
        return {
          id: blog.id,
          heading: blog.name,
          createdAt: blog.createdAt,
          tags: blog.tags.map((p: any) => p.name),
          views: blog.views,
          content: blog.description,
          imageUrl: blog.imageUrl,
        };
      })
    return <ListArticle content={content.reverse()} handleArticleClick={(id) => {
      router.push(`/blogs/${id}`)
    }} />;
  }

  const renderHeading = (title: string) => {
    return (
      <>
        <hr />
        <Heading>{title}</Heading>
        <hr />
      </>
    );
  };

  const renderViewAllButton = (callback: () => void) => {
    return (
      <>
        <hr />
        <Button className={styles.viewAllBtn} onPress={callback}>
          View All <BsChevronRight />
        </Button>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Suboor | Home</title>
        <meta name="description" content={profile.aboutMe} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileHero profile={profile} skills={skills} />
      {/* <TechCube /> */}
      {renderHeading("projects")}
      {renderProjectsList()}
      {renderViewAllButton(() => {router.push('/projects')})}
      {renderHeading("blogs")}
      {renderBlogList()}
      {renderViewAllButton(() => {router.push('/blogs')})}
      <hr />
    </>
  ); 
}

{
  /* <ReadMore
        heading={mainProject.name}
        createdAt={mainProject.createdAt}
        tags={[]}
        views={mainProject.views}
        content={mainProject.content}
        imageUrl={mainProject.imageUrl}
      /> */
}
