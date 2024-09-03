import React from 'react';
import LazyImg from '../LazyImg';

const ImageContent = ({ entity = {} }) => {
    const { imageUrl, tags = [] } = entity;
    return (
        <>
            <LazyImg src={imageUrl} className="h-[300px] md:h-[500px] mt-5 rounded-md object-contain md:object-cover w-full" />
            <hr className="mt-3" />
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-center items-center md:justify-between py-2">
                <div className="flex gap-2 items-center">
                    <LazyImg className="w-12 h-12 object-contain rounded-full border" src="/assets/me.jpg" />
                    <div>
                        <h2 className="font-bold my-0">Suboor Khan</h2>
                        <p className="font-light text-sm my-0">Software Engineer</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {tags.map((t) => (
                        <span className="bg-slate-100 px-4 h-[35px] md:h-[40px] text-sm font-light border rounded-full flex justify-center items-center">{t.name}</span>
                    ))}
                </div>
            </div>
            <hr />
        </>
    );
};

export default ImageContent;
