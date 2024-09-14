import React from 'react';
import { motion } from 'framer-motion';

const UmamaHero = () => {
    return (
        <motion.div
            className="relative w-full h-[70vh] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/umama.jpeg')" }}
                animate={{ scale: [ 1, 1.4, 1] }} // Continuous zoom effect
                transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }}
            ></motion.div>

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Centered Text */}
            <div className="relative z-10 flex items-center justify-center w-full h-full text-center">
                <div className="p-10 rounded-xl max-w-2xl md:max-w-5xl">
                    <motion.h1
                        className="text-3xl md:text-7xl font-bold text-white mb-4"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: [1, 0.8, 1] }} 
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    >
                        Umama ❤️ Suboor
                    </motion.h1>
                    <motion.p
                        className="text-md md:text-xl text-white mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: [1, 0.8, 1] }} 
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    >
                        You have no idea how incredibly beautiful you are, inside and out. 🌟 I’m over the moon with happiness and gratitude that I get to have you by my side. Every day with you
                        feels like a dream come true, and I consider myself incredibly lucky to be marrying someone as wonderful as you. 💍 Your love, kindness, and support mean everything to me,
                        and I can’t wait to build our future together. You truly are my world, and I’m so excited to spend the rest of my life with you. 💖✨
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default UmamaHero;
