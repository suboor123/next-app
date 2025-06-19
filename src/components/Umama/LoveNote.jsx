'use client';

import { motion } from 'framer-motion';

export default function RomanticLovePage() {
  return (
    <div className="bg-pink-50 text-pink-900 font-serif">
      {/* Hero Section */}
      <div
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/assets/su.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg font-cursive">
              You are always mine ❤️
            </h1>
            <p className="text-white font-poppins mt-6 text-lg md:text-xl max-w-2xl mx-auto">
              No matter how hard life gets, no matter what storms we face — you’ll
              always be the one my heart beats for. Forever and always.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Everything Will Be Alright Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center font-cursive">
          Everything Will Be Alright 💞
        </h2>
        <ul className="list-disc list-inside space-y-4 text-lg font-poppins">
          <li>We’ll rebuild our dreams, brick by brick, together </li>
          <li>We’ll travel to all the places we dreamed of </li>
          <li>We’ll find joy in the little things, side by side </li>
          <li>We’ll celebrate each win and grow from every struggle </li>
          <li>We’ll create a peaceful, loving home filled with laughter </li>
          <li>We’ll grow older together and still hold hands </li>
          <li>We’ll become the couple we always wanted to be </li>
          <li>We’ll turn our pain into strength and wisdom </li>
          <li>We’ll never give up on us, not now, not ever 💍</li>
          <li>We’ll make this love story one to remember forever</li>
        </ul>
      </motion.section>

      {/* I Will Make You Feel Better Section */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-pink-100 rounded-3xl max-w-3xl mx-auto shadow-lg"
      >
        <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center font-cursive">
          I Will Make You Feel Better 
        </h2>
        <ul className="list-decimal list-inside space-y-3 text-lg font-poppins">
          <li>Hold you tight when you're sad </li>
          <li>Make you smile every morning </li>
          <li>Write little love notes for your day </li>
          <li>Plan surprise dates just for us </li>
          <li>Cook your favorite meals with love </li>
          <li>Play your favorite songs to dance around </li>
          <li>Give you space when needed, but never let go </li>
          <li>Compliment you every single day </li>
          <li>Talk through every emotion with patience </li>
          <li>Remind you that you are never alone </li>
        </ul>
      </motion.section>

      {/* You Are The Most Beautiful Woman Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center font-cursive">
          You Are the Most Beautiful Woman in the World 🌹
        </h2>
        <ul className="list-disc list-inside space-y-3 text-lg font-poppins">
          <li>Aap Shibra se bh zyada khoobsurat hain</li>
          <li>Your eyes hold galaxies I get lost in 🌌</li>
          <li>Your voice calms every storm in me 🌊</li>
          <li>Your laugh is my favorite melody 🎵</li>
          <li>Your heart is the kindest I’ve ever known 💝</li>
          <li>Your strength is breathtaking 💪</li>
          <li>Your softness makes me feel safe 🧸</li>
          <li>Your soul is radiant, inside and out 🌟</li>
          <li>Your beauty is timeless, effortless, eternal ⏳</li>
          <li>To me, you are everything — the most beautiful woman on Earth 🌍</li>
        </ul>
      </motion.section>
    </div>
  );
}
