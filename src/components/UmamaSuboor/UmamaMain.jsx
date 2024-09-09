import React from 'react';
import LazyImg from '../LazyImg';

const UmamaMain = () => {
    return (
        <section id="main" className="px-3 md:px-20 py-10 block md:flex md:justify-center md:items-center">
            <div>
                <h2 className=" font-bold text-xl">I Love You Sooo Much Umama ❤️</h2>
                <p className="text-md  text-gray-600 font-light my-3">
                    I had no idea that I would ever receive so much love, and honestly, I never imagined I’d be with someone as incredible as you. I am beyond happy and feel that I need nothing else
                    in my life but you. 🌟
                    <br />
                    <br />I promise to do my utmost to fulfill all your dreams and to keep you so incredibly happy that you’ll never know sadness. 💖✨ You mean everything to me, and I can't wait to
                    spend the rest of my life making you smile. 💍💫
                </p>
            </div>
            <LazyImg className="mt-5 rounded-xl" src="/assets/anim-couple.avif" />
        </section>
    );
};

export default UmamaMain;
