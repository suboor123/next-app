import React, { useState, useRef, useEffect } from 'react';

const PlayIcon = ({ size = 5 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
        </svg>
    );
};

const StopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
    </svg>
);

const SONGS = [
    { name: 'Kaise Mujhe Tum Mil Gyin', url: '/assets/kaise.mp3' },
    { name: 'Pehli Dafa', url: '/assets/pehli.mp3' },
    { name: 'Tera He Rahoon', url: '/assets/tera_he_rahoon.mp3' },
    { name: 'O`Meri Laila', url: '/assets/laila.mp3' },
    { name: 'Hona Tha Pyaar', url: '/assets/pyr.mp3' },
];

const SongList = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const handlePlay = (song) => {
        if (currentSong?.url === song.url && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.load();
                    audioRef.current.play();
                }
            }, 100); // Adding slight delay for load
        }
    };

    const handlePausePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const updateProgress = () => {
        if (audioRef.current && currentSong) {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            setProgress((currentTime / duration) * 100);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateProgress();
        }, 500);
        return () => clearInterval(interval);
    }, [currentSong]);

    const renderSongs = () => {
        return SONGS.map((song, idx) => (
            <li key={idx} className="border border-gray-100 rounded-md p-3 flex justify-between items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-600">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                    />
                </svg>

                <span className="ml-4 truncate overflow-hidden whitespace-nowrap text-ellipsis">{song.name}</span>
                <button onClick={() => handlePlay(song)} className="bg-slate-100 px-4 py-1 text-sm rounded-full hover:bg-slate-200 transition">
                    {currentSong?.url === song.url && isPlaying ? <StopIcon /> : <PlayIcon />}
                </button>
            </li>
        ));
    };

    return (
        <div className="mt-5 bg-gray-50">
            <ul>{renderSongs()}</ul>

            {currentSong && <BottomStickyPlayer song={currentSong} isPlaying={isPlaying} progress={progress} audioRef={audioRef} onPausePlay={handlePausePlay} />}
        </div>
    );
};

const BottomStickyPlayer = ({ song, isPlaying, progress, audioRef, onPausePlay }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex flex-col justify-between items-center border-t border-gray-200 z-[999999]">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-pink-600">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                        />
                    </svg>
                    <div className="ml-4">
                        <div className="text-md font-semibold text-gray-800">{song.name}</div>
                        <audio ref={audioRef} className="hidden">
                            <source src={song.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>

                <button onClick={onPausePlay} className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition">
                    {isPlaying ? <StopIcon /> : <PlayIcon />}
                </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 rounded mt-4">
                <div className="h-full bg-pink-600 rounded" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default SongList;
