import Heading from "@/components/heading";
import ListArticle from "@/components/list-article";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import { Project } from "@/types/types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

export async function getStaticProps() {
  const projects = await FirebaseHelper.syncAllProjects();
  return {
    props: {
      projects,
    },
  };
}

type Props = {
  projects: Project[];
};

const Project = (props: Props) => {
  const { projects } = props;
  const router = useRouter()

  const renderProjectsList = useMemo(() => {
    const content = projects
      .filter((p) => p.description)
      .map((project) => {
        return {
          id: project.id!,
          heading: project.name,
          createdAt: project.createdAt,
          tags: project.tags.map((p: any) => p.name),
          views: project.views,
          content: project.description,
          imageUrl: project.imageUrl,
        };
      });
    return <ListArticle content={content} handleArticleClick={(id) => {
      console.log(id)
      router.push(`/projects/${id}`)
    }} />;
  }, [projects.length]);

  const renderHeading = (title: string) => {
    return (
      <>
        <hr />
        <Heading>{title}</Heading>
        <hr />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Suboor | Projects</title>
        <meta
          name="description"
          content={projects.map((p) => p.name).join(", ")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderHeading("projects")}
      {renderProjectsList}
    </>
  );
};

export default Project;
