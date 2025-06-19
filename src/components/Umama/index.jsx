'use client';
import React, { Suspense, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoveNote from './LoveNote';
import SongsUmama from './SongsUmama';
import VideoSection from './VideoSection';
import Proposal from './Proposal';

export const hideLayouts = () => {
    const header = document.querySelector('#header');
    if (header) header.style.display = 'none';

    const bottomNav = document.querySelector('#bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
};

const UmamaSuboor = ({ router }) => {
    const [showPage, setShowPage] = useState();
    const searchParams = useSearchParams();
    const hasQuery = searchParams.get('ps');
    useLayoutEffect(() => {
        hideLayouts();
    }, []);

    return (
        <section className="font-poppins">
            <style jsx global>{`
                .font-cursive {
                    font-family: 'Playwrite CU' !important;
                }
            `}</style>
            <LoveNote />
            <SongsUmama />
            <VideoSection />
            <Proposal />
        </section>
    );
};

const UmamaWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UmamaSuboor />
        </Suspense>
    );
};

export default UmamaWrapper;
