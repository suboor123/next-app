import React from 'react';
import HomeAbout from './HomeAbout';
import HomeImage from './HomeImage';
import { BackgroundHero } from '../Background';

const HomePage = () => {
    return (
        <section className="flex items-center relative overflow-hidden">
            {/* <BackgroundHero /> */}
            <HomeAbout />
            <HomeImage />
        </section>
    );
};

export default HomePage;
