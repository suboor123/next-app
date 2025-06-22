import React from 'react';
import LazyImg from '../LazyImg';

const FinalSection = () => {
    return (
        <section className="px-3 py-10 md:px-20 block md:flex md:justify-center md:items-center relative">
        <LazyImg src="/assets/rose2.png" className="absolute z-0 opacity-30 top-[100px] left-0" />
            <h2 className=" font-bold my-5 text-xl font-cursive">I Love you so Much Umama 💖</h2>
            <p className="text-md  p-2">
                Mujhe pta hai abhi hmare paas zyada baat nahi hoti krne k liye and aap bh sochti hongi ki kya he baat ki jaaye pr I am trying my best ki mein aapke aur close aa pau aur aap aur bh
                zyada comfortable ho jayein mujhse baat krne aur jo bh aapke dil mein aayein wo baat krne lage mein chahta hoon aap mujhse aaur bh zyada pyar karein,
            </p>

            <p className="text-md  p-2 mt-2">
                Mujhe pta hai aaj humne itna ache se baat nahi ki aur mujhe bhut ajeeb bh lg raha hai pr mein bhut pyaar krta hoon apse itna ki aajtk kisi se nahi kiya apni zindagi mein. <br />
            </p>

            <p className="text-md  p-2 mt-2">
                Mein chahta hoon aap hmesha khush rahein aur hmesha mere paas rahein, mein poore time aapke baare mein sochta rehta hoon aur mujhe wo krna bhut pasand hai. Mujhe aaj bilkul acha nahi
                lg raha bhut bechaini si hogye hai mere dil mein shayad tbyt kharab hai is wajah se. <br />
                Pr you are the best and you deserve all of my love and care 💖
            </p>

            <LazyImg src="/assets/love.gif" className="w-[80%] mx-auto " />
        </section>
    );
};

export default FinalSection;
