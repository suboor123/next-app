'use client';

import { useState } from 'react';
import { sendEmail } from '../UmamaQuiz/constants';
import Notification from '@/lib/notification';

const messages = [
    'Are you *really* sure? 😢',
    'But I love you so much! 💔',
    'Think about all our dreams together 💭',
    'I’ll wait... forever if I have to 🕰️',
    "Was that a mistake? Tap 'Yes' instead 😅",
    "No? That can't be right... try again ❤️",
    "Don't break my heart like this 🥺",
    'One more chance, please? 🙏',
    'You complete me... say yes? 💍',
    "C'mon... we're meant to be 💫",
];

export default function Proposal() {
    const [noCount, setNoCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState();

    const onAccept = () => {
        // Your logic goes here, e.g. confetti, redirect, celebration etc.
        sendEmail('Yes Clicked');
        Notification.success('YES?! You just completed my world, Umama. I love you endlessly. Let’s build the most beautiful life together! 🌸❤️');
        setShowSuccess(true);
    };

    const handleNo = () => {
        setNoCount((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-6 font-serif">Will you be mine forever? 💍❤️</h1>
            <p className="text-lg md:text-xl text-pink-800 max-w-xl mb-10">
                I promise to love you, support you, annoy you just a little, and hold your hand through every chapter of our life. Will you say yes?
            </p>

            <div className="flex gap-6">
                <button onClick={onAccept} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-lg transition">
                    Yes 💖
                </button>
                <button onClick={handleNo} className="bg-white border border-pink-500 text-pink-500 px-6 py-3 rounded-full text-lg hover:bg-pink-100 transition">
                    No 🙈
                </button>
            </div>

            {noCount > 0 && <div className="mt-8 text-pink-600 text-lg font-medium animate-pulse">{messages[noCount % messages.length]}</div>}
            {showSuccess && (
                <div className="mt-8 text-pink-600 text-lg font-medium animate-pulse">
                    YES?! You just completed my world, Umama. I love you endlessly. Let’s build the most beautiful life together! 🌸❤️
                </div>
            )}
        </div>
    );
}
