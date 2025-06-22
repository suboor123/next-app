import React from 'react';
import LazyImg from '../LazyImg';

const UmamaMain = () => {
    return (
        <section id="main" className="px-3 md:px-20 py-10 block md:flex md:justify-center md:items-center rose-bg relative">
            <LazyImg src="/assets/roses.png" className="absolute z-0 opacity-25 top-[20px] left-0" />
            <div>
                <h2 className=" font-bold text-xl font-cursive">Arunya ❤️</h2>
                <p className="text-md  text-gray-600 font-light my-3">
                    You must be a cardiologist, because every time I see you, my heart skips a beat 💓. You’re not just beautiful — you’re absolutely stunning, like a perfect rhythm that no scan could
                    ever capture 😍. I swear, every vein in my body is carrying thoughts of you, and I don’t need a stethoscope to feel how deeply you’ve touched my heart 🩺❤️. You heal people with
                    your hands, but you’ve healed parts of me just by being you 💘.
                    <br />
                    <br />
                    Since the day we started talking, I’ve felt this happiness I can’t quite explain — like life got a little brighter, a little softer, just because you're in it ☀️. Your words, your
                    energy, your smile… they’ve all become my favorite part of the day. Whatever you did to me, I don’t want the cure — I just want more of you 🥰.
                </p>
            </div>
            <LazyImg className="mt-5 rounded-xl" src="/assets/anim-couple.avif" />
        </section>
    );
};

export default UmamaMain;
