import React from 'react';

const UmamaHero = () => {
    return (
        <>
            <div className="relative w-full h-[70vh]">
                {/* Background Image with Animation */}
                <div className="absolute inset-0 bg-cover bg-center bg-zoom" style={{ backgroundImage: "url('/assets/umama.jpeg')" }}></div>

                {/* Backdrop */}
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                {/* Centered Text */}
                <div className="relative z-10 flex items-center justify-center w-full h-full text-center">
                    <div className="p-10 rounded-xl max-w-2xl md:max-w-5xl">
                        <h1 className="text-3xl md:text-7xl font-bold text-white mb-4">Umama ❤️ Suboor</h1>
                        <p className="text-md md:text-xl text-white mb-6">
                            You have no idea how incredibly beautiful you are, inside and out. 🌟 I’m over the moon with happiness and gratitude that I get to have you by my side. Every day with you
                            feels like a dream come true, and I consider myself incredibly lucky to be marrying someone as wonderful as you. 💍 Your love, kindness, and support mean everything to me,
                            and I can’t wait to build our future together. You truly are my world, and I’m so excited to spend the rest of my life with you. 💖✨
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UmamaHero;
