import UmamaSuboor from '@/components/Umama';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';
import Head from 'next/head';

const url = `${HOST}`;
const title = 'Umama';
const description = 'Umama';
const keywords = 'Umama';
const image = `${HOST}/assets/umama.jpeg`;

// Create metadata object for SEO
export const metadata = {
    ...createMetaData({ title, description, keywords, url, image }),
};

export default function Projects() {
    return (
        <>
            <meta name="robots" content="noindex, nofollow" />
            <link href="https://fonts.googleapis.com/css?family=Playwrite+CU" rel="stylesheet" />
            <UmamaSuboor />
        </>
    );
}
