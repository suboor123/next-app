
import UmamaSuboor from '@/components/UmamaSuboor';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';
import Head from 'next/head';

const url = `${HOST}`;
const title = 'Umama';
const description = 'Umama';
const keywords = 'Umama';

export const metadata = {
    ...createMetaData({ title, description, keywords, url }),
};

export default function Projects() {
    return (
        <>
             <link href="https://fonts.googleapis.com/css?family=Playwrite CU" rel="stylesheet" />
            <UmamaSuboor />
        </>
    );
}
