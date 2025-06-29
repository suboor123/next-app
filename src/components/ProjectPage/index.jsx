import { getSiteData } from '@/data/getSiteData';
import React, { Fragment } from 'react';
import SevenXL from '../7xl';
import ProjectCard from './ProjectCard';
import { BackgroundHero } from '../Background';
import Card from '../Card';
import SectionHeading from '../SectionHeading';

const ProjectPage = () => {
    const projects = (getSiteData('projects') || []).reverse();

    return (
        <section className="relative">
            <BackgroundHero />
            <SevenXL>
                <SectionHeading
                    title="Explore My Projects: Innovation and Excellence in Action"
                    description="Explore a curated selection of my projects, showcasing innovative web and mobile applications. Each project reflects my expertise and commitment to delivering impactful solutions. Dive in to see how I transform ideas into functional, user-centered designs."
                />

                <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-1 px-5 gap-8 xl:grid-cols-4 mt-16">
                    {projects.map((blog, idx) => {
                        const detailUrl = `/projects/${blog.name.split(' ').join('-').toLowerCase()}-${blog.key}`;
                        return (
                            <Fragment key={`blog-${idx}`}>
                                <Card blog={blog} detailUrl={detailUrl} />
                            </Fragment>
                        );
                    })}
                </div>
            </SevenXL>
        </section>
    );
};

export default ProjectPage;
