import { getSiteData } from '@/data/getSiteData';
import React from 'react';
import Technologies from './Technologies';

const AboutContent = () => {
    const skills = getSiteData('tags') || [];
    return (
        <div className="w-[100%] md:w-[50%] px-5 md:mx-[100px] relative overflow-hidden pt-20 md:py-20">
            <img src="/assets/me2.jpg" className="rounded-md h-[300px] md:h-[500px] object-cover w-[100%]" />
            <p className="text-md font-light mt-5">
                <span className="text-2xl font-bold">Hello!</span> I'm Suboor Khan, an accomplished Web and Mobile Developer with over 4 years of experience in delivering cutting-edge web solutions.
                My expertise lies in transforming intricate challenges into intuitive, high-performance applications across various industries. I am adept at leveraging the latest technological
                advancements to design, develop, and rigorously test applications that not only fulfill but surpass client expectations. My meticulous attention to detail and commitment to staying
                ahead of tech trends empower me to craft solutions that are both innovative and effective.
            </p>
            <Technologies tech={skills} />
        </div>
    );
};

export default AboutContent;
