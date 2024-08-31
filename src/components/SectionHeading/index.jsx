import React from 'react';

const SectionHeading = ({ title = '', description = '' }) => {
    return (
        <>
            <h1 className="text-5xl font-bold text-gray-800 pt-10">{title}</h1>
            <p className="text-md font-light text-gray-700 mt-2">{description}</p>
        </>
    );
};

export default SectionHeading;
