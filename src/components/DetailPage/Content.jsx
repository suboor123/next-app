'use client';
import React from 'react';

const Content = ({ entity = {} }) => {
    const { content } = entity;

    return (
        <>
            <style global jsx>{`
                .content-blk p {
                    margin: 20px 0;
                }
                .content-blk h1,
                h2,
                h3,
                h4,
                h5,
                h6,
                b {
                    font-weight: 800;
                }
                .content-blk h1,
                h2,
                h3 {
                    font-size: 30px;
                    margin: 10px 0;
                }
                .content-blk p {
                    font-size: 14px;
                }
                .content-blk img {
                    width: 100%;
                }
                .content-blk button,
                .content-blk a {
                    background: black;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 10px;
                }
            `}</style>
            <div className="mt-4 content-blk" dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
};

export default Content;
