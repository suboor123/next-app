'use client';
import React from 'react';
import SocialShare from '../Home/SocialShare';
import { BackgroundHero } from '../Background';

const ComingSoon = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <BackgroundHero />
        <div className="text-center p-8 backdrop-blur-sm bg-white/70 shadow-sm">
          <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
          <p className="text-lg mb-6">We're working hard to get things ready. Stay tuned!</p>
          <p className="text-sm">Follow us on social media for updates!</p>
         <div className='mx-auto text-center flex justify-center items-center'> <SocialShare /></div>
        </div>
      </div>
    );
  };
  
  export default ComingSoon;
