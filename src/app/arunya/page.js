import UmamaSuboor from '@/components/Arunya';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';
import Head from 'next/head';

const url = `${HOST}`;
const title = 'To My Beautiful Arunya 💖';
const description = 'A heartfelt message for Arunya, the doctor who stole my heart and filled my life with happiness.';
const keywords = 'Arunya, love message, beautiful doctor, romantic note, heartfelt words, cardiologist love, sweet message';

const image = `${HOST}/assets/arunya.jpeg`;

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
