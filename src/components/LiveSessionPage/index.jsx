import { getSiteData } from '@/data/getSiteData';
import React, { Fragment } from 'react';
import SevenXL from '../7xl';
import Card from '../Card';
import SectionHeading from '../SectionHeading';

const LiveSessionPage = () => {
    const Blogs = (getSiteData('sessions') || [])
    return (
        <section className="relative">
            <SevenXL>
            <SectionHeading
                    title="Live Sessions & Webinars: Engage with Expert Talks and Tutorials"
                    description="Join me for live sessions and webinars covering the latest trends and techniques in web and mobile development. Participate in interactive discussions, coding tutorials, and Q&A sessions to enhance your skills and stay updated with industry advancements."
                />
                <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-1 px-5 gap-8 xl:grid-cols-3 mt-16">
                    {Blogs.map((blog, idx) => (
                        <Fragment key={`blog-${idx}`}>
                            <Card blog={blog} />
                        </Fragment>
                    ))}
                </div>
            </SevenXL>
        </section>
    );
};

export default LiveSessionPage;
