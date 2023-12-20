import Heading from "@/components/heading";
import ListArticle, { ListContent } from "@/components/list-article";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import { Blog } from "@/types/types";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

export async function getStaticProps() {
  const blogs = await FirebaseHelper.syncAllBlogs();
  return {
    props: {
      blogs,
    },
  };
}

type Props = {
  blogs: Blog[];
};

const Blogs = (props: Props) => {
  const { blogs } = props;
  const router = useRouter();

  const renderBlogList = useMemo(() => {
    const content = blogs.map((project) => {
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
    return (
      <ListArticle
        content={content}
        handleArticleClick={(id) => {
          router.push(`/blogs/${id}`);
        }}
      />
    );
  }, [blogs.length]);

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
        <title>Suboor | Blogs</title>
        <meta
          name="description"
          content={blogs.map((p) => p.description).join(", ")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderHeading("blogs")}
      {renderBlogList}
    </>
  );
};

export default Blogs;
