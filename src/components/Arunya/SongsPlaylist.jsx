import React from 'react';
import SongList from './SongList';

const SONGS_DEFAULT = [
    { name: 'Love Me Like You Do', url: '/assets/love_me.mp3' },
    { name: 'Humdard', url: '/assets/humdard.mp3' },
    { name: 'Mere Naam Tu', url: '/assets/mere_naam_tu.mp3' },
    { name: 'Aankhon se', url: '/assets/aankho_se.mp3' },
];

const SongsPlaylist = () => {
    return (
        <section className="px-3 md:px-20 block md:flex md:justify-center md:items-center">
            <h2 className=" font-bold text-xl font-cursive">These are the songs I want to dedicate to you, each one a piece of my heart and a reflection of how much you mean to me. 🎶💖 ❤️</h2>
            <SongList  />
        </section>
    );
};

export default SongsPlaylist;
