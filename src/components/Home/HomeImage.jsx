import { APP_TITLE } from '@/constants';
import React from 'react';

const HomeImage = ({ src = "/assets/me.jpg" }) => {
    return (
        <div className="w-full md:w-[50%] z-50">
            <img title={APP_TITLE} alt={APP_TITLE}  className="w-[100%] object-cover h-[100vh] filter grayscale transition-filter duration-500 hover:filter-none" src={src} />
        </div>
    );
};

export default HomeImage;
