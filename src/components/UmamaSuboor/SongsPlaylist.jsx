import React from 'react';
import SongList from './SongList';

const SongsPlaylist = () => {
    return (
        <section className="px-3 md:px-20 block md:flex md:justify-center md:items-center">
            <h2 className=" font-bold text-xl">These are the songs I want to dedicate to you, each one a piece of my heart and a reflection of how much you mean to me. 🎶💖 ❤️</h2>
            <SongList />
        </section>
    );
};

export default SongsPlaylist;
