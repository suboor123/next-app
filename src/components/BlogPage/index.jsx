import { getSiteData } from '@/data/getSiteData';
import React, { Fragment } from 'react';
import SevenXL from '../7xl';
import BlogCard from './BlogCard';
import Card from '../Card';
import SectionHeading from '../SectionHeading';

const BlogPage = () => {
    const Blogs = (getSiteData('blogs') || []).reverse();
    return (
        <section className="relative">
            <SevenXL>
            <SectionHeading
                    title="Insights & Articles: Explore My Latest Blog Posts"
                    description="Dive into my blog for the latest insights and articles on web and mobile development. From technical tutorials to industry trends, explore a wealth of content designed to inform and inspire. Stay updated with valuable knowledge and practical tips from the world of technology."
                />
                <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-1 px-5 gap-8 xl:grid-cols-4 mt-16">
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

export default BlogPage;
