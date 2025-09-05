"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hideLayouts } from "../UmamaSuboor"; // Optional external logic

// 💖 Flying Hearts Animation
const FlyingHearts = ({ onDone }) => {
  const hearts = Array.from({ length: 12 });
  return (
    <>
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            y: -600,
            x: Math.random() * 300 - 150,
            scale: 1.2,
            rotate: Math.random() * 360,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 + Math.random() * 1.5, ease: "easeOut" }}
          className="absolute bottom-10 left-1/2 text-pink-500 text-2xl pointer-events-none"
          style={{ transform: `translateX(${Math.random() * 200 - 100}px)` }}
          onAnimationComplete={() => {
            if (i === hearts.length - 1) onDone();
          }}
        >
          💖
        </motion.div>
      ))}
    </>
  );
};

// 🌸 Flower Rain Animation
const FlowerRain = ({ onDone }) => {
  const flowers = Array.from({ length: 20 });
  return (
    <>
      {flowers.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -100 }}
          animate={{
            opacity: 1,
            y: window.innerHeight + 100,
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 + Math.random() * 2 }}
          className="absolute top-0 text-pink-400 text-2xl pointer-events-none"
          onAnimationComplete={() => {
            if (i === flowers.length - 1) onDone();
          }}
        >
          🌸
        </motion.div>
      ))}
    </>
  );
};

// 💍 Ring Growing Animation
const GrowingRing = ({ onDone }) => {
  return (
    <motion.div
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ scale: 3, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      onAnimationComplete={onDone}
    >
      <div className="text-5xl">💍</div>
    </motion.div>
  );
};

// 🎶 Music Player UI
const MusicPlayer = ({ audioRef, isPlaying, currentTime, duration }) => {
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-5 py-2 flex items-center gap-4 border border-pink-200 z-20"
    >
      <span className="text-pink-500 text-xl">🎶</span>
      <div className="text-sm">
        <div className="font-semibold text-pink-600">Tere Hawale Kardiya</div>
        <div className="text-pink-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <button
        onClick={() => {
          if (audioRef.current.paused) {
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
        }}
        className="ml-auto text-pink-500 text-lg"
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
    </motion.div>
  );
};

// 🔘 Bottom Navigation Button
const NavEmoji = ({ emoji, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center text-pink-500 hover:text-pink-600 transition"
  >
    <div className="text-2xl">{emoji}</div>
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export const UmamaLove = () => {
  const [activeEffect, setActiveEffect] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    hideLayouts?.(); // optional external layout function

    const audio = audioRef.current;
    if (audio) {
      const onLoaded = () => setDuration(audio.duration || 0);
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onTimeUpdate = () => setCurrentTime(audio.currentTime);

      audio.addEventListener("loadedmetadata", onLoaded);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        audio.removeEventListener("loadedmetadata", onLoaded);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audio.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, []);

  const handleEffect = (effect) => {
    setActiveEffect(effect);
    if (effect === "music") {
      audioRef.current?.play();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-pink-50 relative overflow-hidden">
      {/* 🔊 Audio */}
      <audio ref={audioRef} src="/assets/hawale.mp3" preload="auto" />

      {/* 🧡 Header & Game Intro */}
      <div className="flex-grow flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
            How Much Do You Love Suboor? 💖
          </h1>
          <p className="text-lg text-pink-600 mb-6">
            A sweet little love game for you, Umama — let's see how deep your love goes 💘
          </p>
          <a
            href="/umama/game"
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition shadow-md"
          >
            Start Game
          </a>
        </div>
      </div>

      {/* ✨ Animations */}
      <AnimatePresence>
        {activeEffect === "hearts" && (
          <FlyingHearts onDone={() => setActiveEffect(null)} />
        )}
        {activeEffect === "flowers" && (
          <FlowerRain onDone={() => setActiveEffect(null)} />
        )}
        {activeEffect === "ring" && (
          <GrowingRing onDone={() => setActiveEffect(null)} />
        )}
      </AnimatePresence>

      {/* 🎶 Music Player */}
      <AnimatePresence>
        {activeEffect === "music" && (
          <MusicPlayer
            audioRef={audioRef}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
          />
        )}
      </AnimatePresence>

      {/* 🔘 Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-200 flex justify-around py-3 z-10">
        <NavEmoji
          emoji="💖"
          label="Love"
          onClick={() => handleEffect("hearts")}
        />
        <NavEmoji
          emoji="🌸"
          label="Flowers"
          onClick={() => handleEffect("flowers")}
        />
        <NavEmoji
          emoji="🎶"
          label="Song"
          onClick={() => handleEffect("music")}
        />
        <NavEmoji
          emoji="💍"
          label="Ring"
          onClick={() => handleEffect("ring")}
        />
      </nav>
    </div>
  );
};
