import React from 'react';
import LazyImg from '../LazyImg';
import Button from '../Button';

const LiveSessionCard = ({ blog = {} }) => {
    const { imageUrl, name, description, url } = blog;
    const title = name;

    return (
        <a className="flex my-5 gap-5 border-dashed items-center border-2 p-3 scale2">
            <LazyImg src={imageUrl} className="w-[100px] h-[100px] min-w-[100px] min-h-[100px] md:w-[150px] md:h-[150px] md:min-w-[150px] md:min-h-[150px] bg-gray-400 rounded-md object-cover " />
            <div>
                <h2 className="text-lg md:text-xl font-bold mb-2">{name}</h2>
                <p className="text-sm font-light multiline-ellipsis-4">{description}</p>
            </div>
        </a>
    );
};

export default LiveSessionCard;
