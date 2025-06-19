import SongList from '../UmamaSuboor/SongList';

const SONGS_DEFAULT = [
  { name: 'Love Me Like You Do', url: '/assets/love_me.mp3' },
  { name: 'Humdard', url: '/assets/humdard.mp3' },
  { name: 'Mere Naam Tu', url: '/assets/mere_naam_tu.mp3' },
  { name: 'Aankhon se', url: '/assets/aankho_se.mp3' },
];

const SongsUmama = () => {
  return (
    <section className="px-4 md:px-20 py-16 bg-pink-50 rounded-xl shadow-md space-y-8">
      <h2 className="text-xl md:text-3xl font-bold text-pink- font-poppins leading-relaxed max-w-3xl mx-auto text-center">
        These songs are little pieces of my heart, <br />
        dedicated to you — the love of my life. 🎶❤️ <br />
        Every beat, every lyric, every note is us. 💖
      </h2>

      <div className="flex justify-center">
        <SongList SONGS={SONGS_DEFAULT} />
      </div>
    </section>
  );
};

export default SongsUmama;
