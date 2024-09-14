import React from 'react';
import { motion } from 'framer-motion';

const words = [
    { letter: 'U', word: 'Unique' },
    { letter: 'M', word: 'Magical' },
    { letter: 'A', word: 'Adorable' },
    { letter: 'M', word: 'Marvelous' },
    { letter: 'A', word: 'Angelic' },
];

const UmamaWords = () => {
    return (
        <div className="flex flex-col px-5 bg-slate-100 my-10">
            <div className="">
                {words.map((w, index) => (
                    <motion.div
                        key={index}
                        className='flex gap-4 items-center my-5'
                        initial={{ opacity: 0, x: -50 }} // Initial state: letter starts from the left
                        animate={{ opacity: 1, x: 0 }} // Animated state: letter moves to its final position
                        transition={{ duration: 0.8, delay: index * 0.3 }} // Staggered animation for each item
                    >
                        <motion.h3
                            className='text-8xl font-extrabold text-pink-500'
                            initial={{ opacity: 0, x: -50 }} // Letter animation: slides in from left
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: index * 0.3 }} // Delayed animation for smooth effect
                        >
                            {w.letter}
                        </motion.h3>
                        <motion.p
                            className='text-2xl text-gray-700'
                            initial={{ opacity: 0, x: 50 }} // Word animation: slides in from right
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: index * 0.3 }} // Delayed animation for smooth effect
                        >
                            {w.word}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default UmamaWords;
