'use client';
import React, { useState } from 'react';
import HomeImage from '../Home/HomeImage';
import ContactForm from './ContactForm';
import { BackgroundHero } from '../Background';

const ContactPage = () => {
    return (
        <section className="flex flex-col md:flex-row items-center relative overflow-hidden">
            <BackgroundHero />
            <ContactForm />
            <HomeImage src="/assets/me2.jpg" />
        </section>
    );
};

export default ContactPage;
