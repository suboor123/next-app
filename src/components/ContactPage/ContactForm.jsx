'use client';
import React, { useState } from 'react';
import SectionHeading from '../SectionHeading';
import SocialShare from '../Home/SocialShare';
import FirebaseHelper from '@/lib/firebase';
import Notification from '@/lib/notification';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            Notification.error('Please enter your name.');
            return;
        }

        const body = {
            name,
            email,
            purpose: message + ` - received from suboorkhan.com`,
            phone: '',
        };
        await FirebaseHelper.sendMessage(body);
        setName('');
        setEmail('');
        setMessage('');
        setShowSuccessMessage(true);
    };

    return (
        <div className="w-full py-0 md:py-10 md:w-[50%] mx-[100px] relative overflow-hidden z-20  p-6 bg rounded-lg">
            <SectionHeading
                title="Get in Touch"
                description="We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out. Use the form below to send us a message, and we'll get back to you as soon as possible. Your input is valuable to us."
            />
            <div className=" px-5 md:px-0">
                <SocialShare />
            </div>
            {showSuccessMessage && <p className="italic text-green-700 mt-2 text-center font-light bg-green-200 py-3 rounded-md px-5 md:px-0">Message received! We'll be in touch soon.</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-5 px-5 md:px-0">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                        placeholder="example@example.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                        placeholder="Your message here"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
