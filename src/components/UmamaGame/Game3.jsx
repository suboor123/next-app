'use client';

import React, { useState } from 'react';

const messages = [
  {
    id: 1,
    text: "Aap meri biwi hain umama",
  },
  {
    id: 2,
    text: "Aap bht moti horhi hain kya khati hai aisa", // fake
  },
  {
    id: 3,
    text: "Tum bht bht pyari ho aur tum meri ho!", // fake
  },
];

const correctMessageId = 1; // The actual message Suboor sent

const Game3 = ({ onComplete }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleSelect = (id) => {
    if (gameOver) return;
    setSelectedId(id);
    setAttempts((a) => a + 1);

    if (id === correctMessageId) {
      setGameOver(true);
      // Calculate score: 100 if first try, else decrease by 20% per extra attempt (min 20%)
      const score = Math.max(100 - (attempts * 20), 20);
      setTimeout(() => onComplete(score), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-pink-50 p-6 text-center">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Level 3: Choose the Right Message</h2>
      <p className="mb-8 text-pink-500 max-w-xl">
        Suboor sent one of these love messages. Can Umama guess which one is real? Choose wisely!
      </p>

      <div className="grid grid-cols-1 gap-6 max-w-xl w-full">
        {messages.map(({ id, text }) => {
          const isSelected = selectedId === id;
          const isCorrect = id === correctMessageId;
          const showResult = gameOver && isSelected;

          return (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              disabled={gameOver}
              className={`
                p-4 rounded-lg border-2
                transition
                focus:outline-none
                ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : 'border-red-500 bg-red-100 text-red-800'
                    : isSelected
                    ? 'border-pink-500 bg-pink-100'
                    : 'border-pink-300 hover:border-pink-500'
                }
              `}
              aria-pressed={isSelected}
            >
              {text}
            </button>
          );
        })}
      </div>

      {gameOver && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-pink-700 mb-3">
            {selectedId === correctMessageId ? 'Correct! 🎉' : 'Oops!'}
          </h3>
          <p className="text-pink-600 mb-4">
            Your Score: <span className="font-extrabold">{Math.max(100 - (attempts - 1) * 20, 20)}%</span>
          </p>
          <p className="text-pink-600">
            The actual message was:<br />
            <em>"{messages.find(m => m.id === correctMessageId).text}"</em>
          </p>
        </div>
      )}
    </div>
  );
};

export default Game3;
