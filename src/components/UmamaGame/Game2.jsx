'use client';

import React, { useEffect, useRef, useState } from 'react';

const Game2 = ({ onComplete }) => {
  const gameDuration = 15;
  const heartFallInterval = 800;
  const basketWidth = 50;

  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [hearts, setHearts] = useState([]);
  const [caught, setCaught] = useState(0);
  const [basketX, setBasketX] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameRef = useRef(null);

  // Set initial basket position after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBasketX(window.innerWidth / 2 - basketWidth / 2);
    }
  }, []);

  // Start timer
  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, gameOver]);

  // Generate hearts
  useEffect(() => {
    if (!started || gameOver) return;

    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * (window.innerWidth - 40);
      setHearts((h) => [...h, { id, left, top: 0 }]);
    }, heartFallInterval);

    return () => clearInterval(interval);
  }, [started, gameOver]);

  // Move hearts downward
  useEffect(() => {
    if (!started || gameOver) return;
    const fallInterval = setInterval(() => {
      setHearts((prev) =>
        prev
          .map((heart) => ({ ...heart, top: heart.top + 10 }))
          .filter((heart) => heart.top < window.innerHeight)
      );
    }, 50);
    return () => clearInterval(fallInterval);
  }, [started, gameOver]);

  // Catch logic
  useEffect(() => {
    const caughtHearts = hearts.filter((heart) => {
      const heartBottom = heart.top + 30;
      const isCaught =
        heartBottom >= window.innerHeight * 0.9 - 100 &&
        heart.left >= basketX &&
        heart.left <= basketX + basketWidth;
      return isCaught;
    });

    if (caughtHearts.length) {
      setCaught((c) => c + caughtHearts.length);
      setHearts((prev) => prev.filter((h) => !caughtHearts.includes(h)));
    }
  }, [hearts, basketX]);

  // Keyboard controls
  useEffect(() => {
    const handleMove = (e) => {
      if (!started) return;
      if (e.key === 'ArrowLeft') {
        setBasketX((x) => Math.max(x - 30, 0));
      } else if (e.key === 'ArrowRight') {
        setBasketX((x) => Math.min(x + 30, window.innerWidth - basketWidth));
      }
    };
    window.addEventListener('keydown', handleMove);
    return () => window.removeEventListener('keydown', handleMove);
  }, [started]);

  // Game over score calculation
  useEffect(() => {
    if (gameOver) {
      const timeout = setTimeout(() => {
        const score = Math.min(Math.round((caught / 10) * 100), 100);
        onComplete(score);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [gameOver, caught, onComplete]);

  // Mobile controls
  const moveLeft = () => started && setBasketX((x) => Math.max(x - 30, 0));
  const moveRight = () => started && setBasketX((x) => Math.min(x + 30, window.innerWidth - basketWidth));

  return (
    <div
      className="relative w-full min-h-[90dvh] overflow-hidden bg-pink-50 touch-none"
      ref={gameRef}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between px-6 z-10">
        <h2 className="text-lg md:text-xl font-bold text-pink-600">
          Level 2: Catch the Falling Hearts
        </h2>
        <div className="text-pink-700 font-semibold">
          Time Left: {started ? `${timeLeft}s` : '--'}
        </div>
      </div>

      {/* Start screen */}
      {!started && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-30 text-center p-6">
          <h3 className="text-2xl font-bold text-pink-600 mb-4">Get Ready!</h3>
          <p className="text-pink-500 mb-6">
            Move the basket to catch as many falling hearts 💖 as possible in 15 seconds.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {/* Falling Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl z-10"
          style={{ top: heart.top, left: heart.left }}
        >
          💖
        </div>
      ))}

      {/* Basket */}
      {started && (
        <div
          className="absolute text-7xl z-20"
          style={{
            bottom: 60, // space above mobile buttons
            left: basketX,
            transition: 'left 0.1s',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          🧺
        </div>
      )}

      {/* Mobile Controls */}
      {started && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 md:hidden z-30 bg-pink-50">
          <button
            onClick={moveLeft}
            className="bg-white text-pink-500 shadow px-6 py-3 rounded-full text-xl font-bold"
          >
            ⬅️
          </button>
          <button
            onClick={moveRight}
            className="bg-white text-pink-500 shadow px-6 py-3 rounded-full text-xl font-bold"
          >
            ➡️
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-40">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-2xl font-bold text-pink-700 mb-2">Time’s Up!</h3>
            <p className="text-pink-600 mb-2">
              You caught <strong>{caught}</strong> hearts!
            </p>
            <p className="text-pink-600">Calculating score...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game2;
