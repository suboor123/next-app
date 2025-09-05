
import UmamaSuboor from '@/components/Umama';
import { UmamaGame } from '@/components/UmamaGame';
import { UmamaLove } from '@/components/UmamaLove';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';
import Head from 'next/head';

const url = `${HOST}`;
const title = 'To My Love, Umama ❤️ – A Page from My Heart';
const description = 'A deeply romantic page dedicated to Umama – filled with love, memories, music, and a promise of forever. Every word here is written just for you.';
const keywords = 'Umama, love letter to Umama, romantic page, proposal for Umama, Umama and me, love story, heartfelt message, songs for Umama, forever love';
const image = `${HOST}/assets/su.jpeg`;

// Create metadata object for SEO
export const metadata = {
    ...createMetaData({ title, description, keywords, url, image }),
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

export default function Projects() {
    return (
        <>
            <meta name="robots" content="noindex, nofollow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link href="https://fonts.googleapis.com/css?family=Playwrite+CU" rel="stylesheet" />
            <UmamaGame />
        </>
    );
}
