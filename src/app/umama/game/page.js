
import UmamaSuboor from '@/components/Umama';
import { UmamaGame } from '@/components/UmamaGame';
import { UmamaLove } from '@/components/UmamaLove';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';
import Head from 'next/head';

const url = `${HOST}`;
const title = 'Umama’s Love Game – A Heartfelt Journey of Fun and Romance ❤️';
const description = 'Play the Love Game with Umama! Catch hearts, guess sweet messages, and celebrate your special bond with fun, laughter, and love. Every level is crafted just for you.';
const keywords = 'Umama, Love Game, romantic games, love messages, heart catcher game, guess the message, fun with Umama, romantic surprises, love challenges, heartfelt fun';
const image = `${HOST}/assets/couple.png`;

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
