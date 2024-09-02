'use client';
import React, { useState } from 'react';
import HomeImage from '../Home/HomeImage';
import ContactForm from './ContactForm';
import { BackgroundHero } from '../Background';

const ImageContent = () => {
    return (
        <div className="absolute md:hidden w-full p-5 bottom-[35px] left-0 transform translate-y-1/2 bg-black bg-opacity-40 text-white flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold mb-2">Excited! let's talk</h2>
        </div>
    );
};

const ContactPage = () => {
    return (
        <section className="flex flex-col-reverse md:flex-row items-center relative overflow-hidden">
            <BackgroundHero />
            <ContactForm />
            <HomeImage imageContent={<ImageContent />} className="md:block" src="/assets/cc.webp" />
        </section>
    );
};

export default ContactPage;
