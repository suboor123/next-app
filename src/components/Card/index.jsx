import React from 'react';
import LazyImg from '../LazyImg';
import Button from '../Button';

const Card = ({ blog = {}, detailUrl }) => {
    const { imageUrl, name, description, url } = blog;
    const title = name;

    return (
        <a
            title={`${title} - ${description}`}
            href={detailUrl}
            className="font-poppins ml-auto mr-auto w-full  rounded-xl shadow group
             bg-white/70 overflow-hidden border hover:shadow-xl  p-2 relative scale"
        >
            <div className="flex flex-col items-center gap-1 justify-center pb-5">
                <LazyImg className="w-[100%] h-[200px] min-w-[100%] min-h-[200px] rounded-md bg-gray-200 object-cover" src={imageUrl} alt={`${title} services`} title={`${title} - ${description}`} />
                <h2 className="font-extrabold text-center mt-3 text-gray-900 text-lg mb-2">{title}</h2>
                <p className="text-center text-sm font-light text-gray-600 multiline-ellipsis">{description}</p>
                <div>{/* <Button url="/contact">Read More</Button> */}</div>
            </div>
        </a>
    );
};

export default Card;
