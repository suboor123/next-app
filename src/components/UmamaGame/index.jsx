'use client';

import React, { useState, useEffect, useRef } from 'react';
import { hideLayouts } from '../Arunya';
import Game2 from './Game2';
import Game3 from './Game3';
import { ScorePage } from './ScorePage';

// ====== Game 1 Component ======
const Game1 = ({ onComplete }) => {
    const maxTime = 10; // seconds
    const maxTapsForFullScore = 20; // 20 taps or more = 100%
    const scaleIncrement = 0.15; // heart grows by this factor each tap

    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [heartScale, setHeartScale] = useState(1);
    const [tapCount, setTapCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const timerRef = useRef(null);

    // Start timer after first tap
    useEffect(() => {
        if (!timerStarted || gameOver) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((time) => {
                if (time <= 1) {
                    clearInterval(timerRef.current);
                    setGameOver(true);
                    return 0;
                }
                return time - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [timerStarted, gameOver]);

    // Handle tap on heart
    const handleTap = () => {
        if (gameOver) return;
        if (!timerStarted) setTimerStarted(true);

        setTapCount((count) => count + 1);
        setHeartScale((scale) => scale + scaleIncrement); // grow infinitely
    };

    // Calculate score percentage based on taps, capped at 100%
    const scorePercent = Math.min(Math.round((tapCount / maxTapsForFullScore) * 100), 100);

    // Notify parent when game ends, after short delay
    useEffect(() => {
        if (gameOver) {
            const timeout = setTimeout(() => {
                onComplete(scorePercent);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [gameOver, scorePercent, onComplete]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-pink-50 p-4 text-center">
            {/* Instruction and timer box at top */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-8">
  <h2 className="text-3xl font-bold text-pink-600 mb-4">Level 1: Grow the Heart</h2>
  <p className="mb-4 text-pink-500">
    Tap the heart as much as you can in 10 seconds to grow it and get the highest score!
  </p>
  <div className="text-pink-700 font-semibold text-xl mb-2">
    Time Left: {timeLeft}s
  </div>
  {!timerStarted && (
    <p className="text-sm text-gray-500">⏳ Timer will start on your first tap.</p>
  )}
</div>

            {/* Heart tap area */}
            <div
                onClick={handleTap}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleTap();
                    }
                }}
                className="cursor-pointer mt-[100px] select-none text-pink-600"
                style={{
                    fontSize: 64,
                    transform: `scale(${heartScale})`,
                    transition: 'transform 0.1s ease-out',
                    userSelect: 'none',
                }}
                aria-label="Tap to grow heart"
            >
                💖
            </div>

            {/* Game over result */}
            {gameOver && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-72 mx-auto">
                    <h3 className="text-2xl font-bold text-pink-700 mb-3">Time's Up!</h3>
                    <p className="text-pink-600 mb-4">
                        Your Score: <span className="font-extrabold">{scorePercent}%</span>
                    </p>
                    {/* No Play Again button here */}
                </div>
            )}
        </div>
    );
};

// ====== Main Game Container ======
export const UmamaGame = () => {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [scores, setScores] = useState([0, 0, 0]);

    useEffect(() => {
        hideLayouts?.();
    }, []);

    // Callback when a game level completes, receives score
    const handleLevelComplete = (score) => {
        setScores((prev) => {
            const newScores = [...prev];
            newScores[currentLevel - 1] = score;
            return newScores;
        });

        setTimeout(() => {
            if (currentLevel < 3) {
                setCurrentLevel(currentLevel + 1);
            } else {
                setCurrentLevel('score');
            }
        }, 300);
    };

    // Restart entire game
    const restartAll = () => {
        setScores([0, 0, 0]);
        setCurrentLevel(1);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header with level indicator */}
            <header className="bg-pink-100 p-4 text-center font-semibold text-pink-700">{currentLevel === 'score' ? 'Final Score' : `Level ${currentLevel} of 3`}</header>

            <main className="flex-grow overflow-auto">
                {currentLevel === 1 && <Game1 onComplete={handleLevelComplete} />}
                {currentLevel === 2 && <Game2 onComplete={handleLevelComplete} />}
                {currentLevel === 3 && <Game3 onComplete={handleLevelComplete} />}
                {currentLevel === 'score' && <ScorePage scores={scores} onRestart={restartAll} />}
            </main>
        </div>
    );
};
