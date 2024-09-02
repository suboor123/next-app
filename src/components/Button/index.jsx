import React from 'react';

const Button = ({ children, url, className = '' }) => {
    return (
        <a className={"1 cursor-pointer w-fit text-primary px-4 py-2 overflow-hidden group inline-flex items-center text-sm relative " + className} href={url}>
            <span className="flex items-center z-50">
                {children}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                    <path
                        fillRule="evenodd"
                        d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
            <span className="absolute inset-0 bg-slate-200 transition-transform duration-300 transform origin-left scale-x-50 group-hover:scale-x-100 z-20" />
        </a>
    );
};

export default Button;
