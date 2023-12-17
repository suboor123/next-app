import Detail from "@/components/detail";
import { FirebaseHelper } from "@/lib/firebase-helpers";
import { Blog, Project } from "@/types/types";
import Head from "next/head";
import React from "react";

type Props = {
  blog: Blog;
  related: Blog[];
};

const ProjectDetail = (props: Props) => {
  const { blog, related } = props;
  return (
    <>
      <Head>
        <title>{blog.name}</title>
        <meta name="description" content={blog.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"
        ></script>
      </Head>

      <Detail
        content={{
          heading: blog.name,
          imageUrl: blog.imageUrl,
          views: blog.views,
          postContent: blog.content,
          createdAt: blog.createdAt,
          tags: blog.tags.map((t: any) => t.name),
          description: blog.description,
        }}
        relatedPost={related.map((blog) => {
          return {
            heading: blog.name,
            imageUrl: blog.imageUrl,
            views: blog.views,
            postContent: blog.content,
            createdAt: blog.createdAt,
            tags: blog.tags.map((t: any) => t.name),
            description: blog.description,
          };
        })}
      />
    </>
  );
};

export default ProjectDetail;

export async function getStaticProps(context: any) {
  const { params } = context;
  const blogId = params.id;
  const blogs = await FirebaseHelper.syncAllBlogs();
  let indexOfSelectedPost: number;
  const blog = blogs.find((p, idx) => {
    if (p.id! === blogId) {
      indexOfSelectedPost = idx;
      return p;
    }
  });
  return {
    props: {
      blog,
      related: blogs
        .slice(indexOfSelectedPost! + 1, blogs.length - 1)
        .slice(0, 3),
    },
  };
}

export async function getStaticPaths() {
  const blogs = await FirebaseHelper.syncAllBlogs();
  return {
    paths: blogs.map((p) => {
      return {
        params: {
          id: p.id!,
        },
      };
    }),
    fallback: false,
  };
}
