import BlogPage from '@/components/BlogPage';
import SeoSchema from '@/components/SeoSchema';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';

const url = `${HOST}/blogs`; 
const title = 'Insights & Articles | Suboor Khan\'s Blog';
const description =
    'Dive into the blog of Suboor Khan, where you’ll find insights, articles, and updates on web and mobile development trends, industry news, and personal experiences. Stay informed and inspired with expert content on the latest in technology and development.';
const keywords =
    'blog, web development blog, mobile development blog, tech insights, development trends, Suboor Khan blog, programming articles, tech news, software development, industry updates, technology blog';

export const metadata = {
    ...createMetaData({ title, description, keywords, url }),
};

export default function Blog() {
    return (
        <>
            <SeoSchema title={title} description={description} url={url} keywords={keywords} />
            <BlogPage />
        </>
    );
}
