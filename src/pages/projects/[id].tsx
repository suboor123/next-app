import Detail from '@/components/detail';
import { FirebaseHelper } from '@/lib/firebase-helpers';
import { Project } from '@/types/types';
import Head from 'next/head';
import React from 'react'

type Props = {
    project: Project;
    related: Project[]
}

const ProjectDetail = (props: Props) => {
    const { project, related=[] } = props;
  return (
    <>
      <Head>
        <title>{project.name}</title>
        <meta name="description" content={project.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Detail
        content={{
          heading: project.name,
          imageUrl: project.imageUrl,
          views: project.views,
          postContent: project.content,
          createdAt: project.createdAt,
          tags: project.tags.map((t: any) => t.name),
          description: project.description,
        }}
        relatedPost={related.map((project) => {
          return {
            heading: project.name,
            imageUrl: project.imageUrl,
            views: project.views,
            postContent: project.content,
            createdAt: project.createdAt,
            tags: project.tags.map((t: any) => t.name),
            description: project.description,
          };
        })}
      />
    </>)
  
}

export default ProjectDetail;

export async function getStaticProps(context: any) {
    const { params } = context;
    const projectId = params.id;
    const projects = await FirebaseHelper.syncAllProjects();
    let indexOfSelectedPost: number;
    const project = projects.find((p, idx) => {
        if(p.id! === projectId) {
            indexOfSelectedPost= idx;
            return p
        }
    });
    return {
        props: {
            project,
            related: projects.slice(indexOfSelectedPost! + 1, projects.length - 1).slice(0, 3),
        },
    };
}

export async function getStaticPaths() {
    const projects = await FirebaseHelper.syncAllProjects();
    return {
        paths: projects.map(p => {
            return {
                params: {
                    id: p.id!
                }
            }
        }),
        fallback: false
    }
}