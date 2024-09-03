import DetailPage from '@/components/DetailPage';
import SeoSchema from '@/components/SeoSchema';
import { getSiteData } from '@/data/getSiteData';
import { notFound } from 'next/navigation';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';

let url = `${HOST}/blogs`;
let title = "Insights & Articles | Suboor Khan's Blog";
let description =
    'Dive into the blog of Suboor Khan, where you’ll find insights, articles, and updates on web and mobile development trends, industry news, and personal experiences. Stay informed and inspired with expert content on the latest in technology and development.';
let keywords =
    'blog, web development blog, mobile development blog, tech insights, development trends, Suboor Khan blog, programming articles, tech news, software development, industry updates, technology blog';

const getId = (params = '') => {
    const urlSplt = params.slug.split('-') || [];
    return `-${urlSplt.pop()}`;
};

export async function generateMetadata({ params, searchParams }, parent) {
    const id = getId(params);
    const blogs = getSiteData('blogs') || [];
    const blog = blogs.find((b) => b.key === id || b.id === id || b.id.indexOf(id) !== -1);

    url = `${HOST}/blogs/${params.slug}`
    title = `${blog.name} | Dive into the blog of Suboor Khan`;
    description = `${blog.description}`;

    return { ...createMetaData({ title, description, keywords, url }) };
}

export default async function (props) {
    const { params } = props;
    const id = getId(params);
    const blogs = getSiteData('blogs') || [];
    const blog = blogs.find((b) => b.key === id || b.id === id || b.id.indexOf(id) !== -1);

    if (!blog) {
        return notFound();
    }

    return (
        <>
            <SeoSchema title={title} description={description} url={url} keywords={keywords} />
            <DetailPage entity={blog} />
        </>
    );
}
