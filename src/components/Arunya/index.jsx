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
        <> </>
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
