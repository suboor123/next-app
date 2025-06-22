// components/YouTubeEmbed.js
import React, { useEffect, useRef, useState } from 'react';

const YouTubeEmbed = ({ videoId }) => {
    const iframeRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Check if the iframe is in the viewport
    const checkVisibility = () => {
        if (iframeRef.current) {
            const rect = iframeRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const isInViewport = rect.top < windowHeight && rect.bottom >= 0;
            setIsVisible(isInViewport);
        }
    };

    useEffect(() => {
        // Initial check
        checkVisibility();

        // Check visibility on scroll and resize
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);

        return () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
        };
    }, []);

    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${isVisible ? 1 : 0}&mute=1`} // Autoplay and mute based on visibility
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
            />
        </div>
    );
};

export default YouTubeEmbed;
