import React from 'react';
import { BackgroundHero } from '../Background';
import AboutContent from './AboutContent';
import AboutAside from './AboutAside';

const AboutPage = () => {
    return (
        <section className="flex gap-0 flex-col-reverse md:gap-0  md:flex-row  relative overflow-hidden py-5 md:py-0  min-h-[100vh]">
            {/* <BackgroundHero /> */}
            <AboutContent />
            <AboutAside />
        </section>
    );
};

export default AboutPage;
