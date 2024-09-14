// components/MyPromises.js

import React from 'react';
import { motion } from 'framer-motion';

// ListItem component
const ListItem = ({ emoji, text }) => {
    return (
        <motion.li
            className="text-md text-gray-800 border p-2 shadow border-l-4 border-l-pink-500"
            initial={{ opacity: 0, y: 50 }} // Initial state
            whileInView={{ opacity: 1, y: 0 }} // Animation when in view
            viewport={{ once: true }} // Animate only once when in view
            transition={{ duration: 0.6 }} // Duration of the animation
        >
            <span className="text-blue-500">{emoji}</span> {text}
        </motion.li>
    );
};

const promises = [
    { emoji: '💖', text: 'I will do everything to make you happy.' },
    { emoji: '🌟', text: 'I will take care of you so much and always be by your side through all the ups and downs.' },
    { emoji: '🤗', text: 'I will be there whenever you feel sad or uncomfortable, to make you feel better.' },
    { emoji: '❤️', text: 'I will love you more than anything else in the whole world.' },
    { emoji: '👑', text: 'I will never let you down and will treat you like the princess you are.' },
    { emoji: '💫', text: 'Everything else will come after you for me.' },
    { emoji: '🎁', text: 'I will fulfill all your big and small wishes.' },
    { emoji: '🌈', text: 'I will do everything to make you love me even more.' },
    { emoji: '😂', text: 'I will make you laugh and fill your days with happiness.' },
    { emoji: '🤲', text: 'I will hug you whenever you cry.' },
    { emoji: '🌹', text: 'I will be the best version of myself for you.' },
    { emoji: '🌹', text: 'I will bring roses for you.' },
    { emoji: '💬', text: 'I will always tell you that you are the most beautiful girl in the world.' },
    { emoji: '📝', text: 'There are a lot of other promises I want to make, but it will take me many days to type them all here. It already took me a week to create this.' },
];

// MyPromises component
const MyPromises = () => {
    return (
        <section className="px-3 py-10 md:px-20 block md:flex md:justify-center md:items-center">
            <h2 className="font-bold my-5 text-xl font-cursive text-pink-700">Promises to You, My Love</h2>
            <ul className="list-none text-sm list-inside space-y-4">
                {promises.map((promise, index) => (
                    <ListItem key={index} emoji={promise.emoji} idx={index} text={promise.text} />
                ))}
            </ul>
        </section>
    );
};

export default MyPromises;
