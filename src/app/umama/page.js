import UmamaSuboor from '@/components/UmamaSuboor';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';
import Head from 'next/head';

const url = `${HOST}`;
const title = 'Umama';
const description = 'Umama';
const keywords = 'Umama';

// Create metadata object for SEO
export const metadata = {
    ...createMetaData({ title, description, keywords, url }),
};

export default function Projects() {
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Playwrite+CU" rel="stylesheet" />
                <meta name="robots" content="noindex, nofollow" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={`/assets/umama.jpeg`} />
                <style jsx global>{`.font-cursive {font-family: 'Playwrite CU' !important;}`}</style>
            </Head>
            <UmamaSuboor />
        </>
    );
}
