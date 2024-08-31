import ProjectPage from '@/components/ProjectPage';
import SeoSchema from '@/components/SeoSchema';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';

const url = `${HOST}/projects`; 
const title = 'Highlighted Projects | Suboor Khan\'s Portfolio';
const description =
    'Explore the showcased projects of Suboor Khan, featuring innovative web and mobile applications developed over 4 years. Discover detailed case studies, technical insights, and the impact of these projects across various industries.';
const keywords =
    'projects, web development projects, mobile app projects, portfolio, case studies, Suboor Khan projects, software development, technology solutions, innovative web apps, mobile application development, project showcase';

export const metadata = {
    ...createMetaData({ title, description, keywords, url }),
};

export default function Projects() {
    return (
        <>
            <SeoSchema title={title} description={description} url={url} keywords={keywords} />
            <ProjectPage />
        </>
    );
}
