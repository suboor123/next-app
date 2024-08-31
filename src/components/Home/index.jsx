import React from 'react';
import HomeAbout from './HomeAbout';
import HomeImage from './HomeImage';
import { BackgroundHero } from '../Background';

const HomePage = () => {
    return (
        <section className="flex gap-5 flex-col-reverse md:gap-0 items-center  md:flex-row  relative overflow-hidden py-5 md:py-0">
            {/* <BackgroundHero /> */}
            <HomeAbout />
            <HomeImage />
        </section>
    );
};

export default HomePage;
