'use client';
import React, { Suspense, useLayoutEffect, useState } from 'react';
import AuthPage from './AuthPage';
import UmamaHero from './UmamaHero';
import UmamaMain from './UmamaMain';
import SongsPlaylist from './SongsPlaylist';
import MyPromises from './MyPromises';
import FinalSection from './FinalSection';
import LazyImg from '../LazyImg';
import {  useSearchParams } from 'next/navigation';
import Proposal from './Proposal';
import UmamaWords from './UmamaName';


export const hideLayouts = () => {
    const header = document.querySelector('#header');
    if (header) header.style.display = 'none';

    const bottomNav = document.querySelector('#bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
};

const UmamaSuboor = ({ router }) => {
    const [showPage, setShowPage] = useState();
    const searchParams = useSearchParams();
    const hasQuery = searchParams.get('ps')
    useLayoutEffect(() => {
        hideLayouts();
    }, []);

    if (!hasQuery) {
        return <AuthPage />;
    }

    return (
        <>
            <style jsx global>{`.font-cursive {font-family: 'Playwrite CU' !important;}`}</style>
            <UmamaHero />
            <UmamaMain />
            <SongsPlaylist />
            {/* <LazyImg className="my-4 w-full min-h-[200px]" src="/assets/moon.webp"/> */}
            <MyPromises />
            {/* <LazyImg className="my-4 w-full min-h-[200px]" src="/assets/couple.webp"/> */}
            <LazyImg src="/assets/matter.gif" className="mx-auto w-[70%] min-h-[200px]" />
            {/* <FinalSection /> */}
            {/* <UmamaWords /> */}
            <h3 className='font-extrabold text-3xl text-center py-20 px-4 bg-black text-white'>
                YOU ARE MY WHOLE WORLD!❤️
            </h3>
            <Proposal />
        </>
    );
};

const UmamaSuboorWrapper = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <UmamaSuboor />
      </Suspense>
    );
  };

export default (UmamaSuboorWrapper);
