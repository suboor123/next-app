'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AuthPage from './AuthPage';
import UmamaHero from './UmamaHero';
import UmamaMain from './UmamaMain';
import SongsPlaylist from './SongsPlaylist';

const hideLayouts = () => {
    const header = document.querySelector('#header');
    if (header) header.style.display = 'none';

    const bottomNav = document.querySelector('#bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
}

const UmamaSuboor = () => {
    const [showPage, setShowPage] = useState();

    useLayoutEffect(() => {
        hideLayouts();
        setShowPage(localStorage?.getItem('ps'))
    }, []);

    if(!showPage) {
        return <AuthPage />
    }

    return <>
        <UmamaHero />
        <UmamaMain />
        <SongsPlaylist />
    </>
};

export default UmamaSuboor;
