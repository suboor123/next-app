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
    { emoji: '💖', text: 'I’ll always do my best to make you smile and feel appreciated.' },
    { emoji: '🌟', text: 'I’ll be by your side, through calm days and chaotic ones — no matter what.' },
    { emoji: '🤗', text: 'Whenever you’re feeling low, I’ll be someone you can count on for comfort and support.' },
    { emoji: '❤️', text: 'I’ll care for you deeply, more than words can ever explain.' },
    { emoji: '👑', text: 'I’ll always treat you with the kindness and respect you truly deserve.' },
    { emoji: '💫', text: 'You’ll always be a priority in my world — your happiness matters to me.' },
    { emoji: '🎁', text: 'From little surprises to thoughtful gestures, I’ll try to bring joy to your everyday life.' },
    { emoji: '🌈', text: 'I’ll try every day to be someone you’re glad to have in your life.' },
    { emoji: '😂', text: 'I’ll make sure to keep you laughing and bring some sunshine to your days.' },
    { emoji: '🤲', text: 'If ever you need a shoulder, I’ll be there — quietly, patiently, just for you.' },
    { emoji: '🌹', text: 'I’ll keep working on myself to be someone you can trust and rely on.' },
    { emoji: '🌼', text: 'I’ll bring small things that brighten your day — maybe a flower, a note, or just time.' },
    { emoji: '💬', text: 'I’ll always remind you of how special you are — inside and out.' },
    { emoji: '📝', text: 'There’s so much more I wish I could promise, but it would take forever to write them all — because you deserve the world.' },
];


// MyPromises component
const MyPromises = () => {
    return (
        <section className="px-3 py-10 md:px-20 block md:flex md:justify-center md:items-center">
            <h2 className="font-bold my-5 text-xl font-cursive text-pink-700">Promises to You</h2>
            <ul className="list-none text-sm list-inside space-y-4">
                {promises.map((promise, index) => (
                    <ListItem key={index} emoji={promise.emoji} idx={index} text={promise.text} />
                ))}
            </ul>
        </section>
    );
};

export default MyPromises;
