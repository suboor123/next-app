'use client';

import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="py-16 px-4 md:px-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-pink- leading-snug">
          Me with you — our whole life,
        </h2>
     
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <video
          className="rounded-xl shadow-xl w-full max-w-3xl"
          controls
        >
          <source src="/assets/tukde.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </section>
  );
};

export default VideoSection;
