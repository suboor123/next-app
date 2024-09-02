import { getSiteData } from '@/data/getSiteData';
import React, { Fragment } from 'react';
import LiveSessionCard from '../LiveSessionPage/LiveSessionCard';
import { BackgroundHero } from '../Background';
import Button from '../Button';

const AboutAside = () => {
    const projects = getSiteData('projects');
    const blogs = getSiteData('blogs');

    return (
        <>
            <div className="w-full h-full relative md:fixed right-0 top-0 md:w-[40%] border-l z-1 py-5 md:py-20 px-5 overflow-y-scroll">
                <hr />
                <div className="flex my-5 items-center justify-between">
                    <h2 className="text-3xl font-bold">Recent Work</h2>
                    <Button url="/projects" className="m-0">
                        View More
                    </Button>
                </div>
                <hr />
                {projects.slice(0, 3).map((blog, idx) => (
                    <Fragment key={`blog-${idx}`}>
                        <LiveSessionCard blog={blog} />
                    </Fragment>
                ))}

                <hr />
                <div className="flex my-5 items-center justify-between">
                    <h2 className="text-3xl font-bold">Recent Articles</h2>
                    <Button url="/blogs" className="m-0">
                        View More
                    </Button>
                </div>
                <hr />
                {blogs.slice(0, 3).map((blog, idx) => (
                    <Fragment key={`blog-${idx}`}>
                        <LiveSessionCard blog={blog} />
                    </Fragment>
                ))}
            </div>
        </>
    );
};

export default AboutAside;
