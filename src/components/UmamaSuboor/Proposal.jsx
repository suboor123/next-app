import React from 'react';
import { motion } from 'framer-motion';

const Proposal = () => {

    // Function to handle Yes button click
    const handleYesClick = () => {
        alert('I love youu soooooooooooooooooooooooooooooooooooo muuuuch Umama')
     };

     const handleNoClick = () => {
        alert('No! You can not say no!! you are mine and that is final')
     }

    return (
        <div className="px-4 mt-10 py-20 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/c2.webp')" }}
                animate={{ scale: [1, 1.1, 1] }} // Continuous zoom effect
                transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }}
            ></motion.div>
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>

            <div className="relative z-10">
                <h2 className="text-pink-500 font-cursive text-center text-xl">Will you be my forever?</h2>
                <div className="flex justify-between gap-10 mt-5 px-4">
                    <button
                        className="px-3 py-1 rounded-md w-full text-white bg-pink-900"
                        onClick={handleYesClick} // Attach handleYesClick to Yes button
                    >
                        Yes
                    </button>
                    <button
                     onClick={handleNoClick}
                        className="px-3 py-1 rounded-md w-full text-white bg-black"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Proposal;
