import DetailPage from '@/components/DetailPage';
import SeoSchema from '@/components/SeoSchema';
import { getSiteData } from '@/data/getSiteData';
import { notFound } from 'next/navigation';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';

let url = `${HOST}/projects`;
let title = "Highlighted Projects | Suboor Khan's Portfolio";
let description =
    'Explore the showcased projects of Suboor Khan, featuring innovative web and mobile applications developed over 4 years. Discover detailed case studies, technical insights, and the impact of these projects across various industries.';
let keywords =
    'projects, web development projects, mobile app projects, portfolio, case studies, Suboor Khan projects, software development, technology solutions, innovative web apps, mobile application development, project showcase';

const getId = (params = '') => {
    const urlSplt = params.slug.split('--') || [];
    const id = urlSplt.pop();
    if (id && id[0] === '-') return id;
    return `-${id}`;
};

export async function generateMetadata({ params, searchParams }, parent) {
    const id = getId(params);
    const projects = getSiteData('projects') || [];
    const project = projects.find((b) => b.id === id);

    if (project) {
        url = `${HOST}/projects/${params.slug}`;
        title = `${project.name} | Dive into the project of Suboor Khan`;
        description = `${project.description}`;
    }

    return { ...createMetaData({ title, description, keywords, url }) };
}

export default async function (props) {
    const { params } = props;
    const id = getId(params);
    const projects = getSiteData('projects') || [];
    const project = projects.find((b) => b.id === id);

    if (!project) {
        return notFound();
    }

    return (
        <>
            <SeoSchema title={title} description={description} url={url} keywords={keywords} />
            <DetailPage entity={project} />
        </>
    );
}
