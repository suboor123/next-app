import React from 'react';
import LazyImg from '../LazyImg';

const Technologies = ({ tech }) => {
    const renderTech = () => {
        return tech.map((t) => (
            <div className="flex justify-center flex-col items-center gap-2">
                <LazyImg title={t.name} alt={t.name} className="w-14 h-14 md:w-12 md:h-12 border object-contain m-1 bg-gray-50 p-2 rounded-full" src={t.imageUrl} />
            </div>
        ));
    };
    return (
        <div className="bg-slate-100 p-4 my-5 md:my-5">
            <h2 className="text-xl mb-3 font-bold">My Skills</h2>
            <div className="flex gap-2 flex-wrap">{renderTech()}</div>
        </div>
    );
};

export default Technologies;
