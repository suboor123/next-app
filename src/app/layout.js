import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';

const title = 'Creative Web & Mobile Developer | Portfolio of Suboor Khan';
const description =
    'Explore the portfolio of Suboor Khan, a skilled Web & Mobile Developer with over 4 years of experience in delivering impactful web solutions. Specializing in fullstack development, I design, develop, and test web applications across various industries. Discover my projects and skills in modern web technologies.';

export const metadata = {
    title,
    description,
};

export default function RootLayout({ children, ...props }) {
    return (
        <>
            <html lang="en">
                <head>
                    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
                </head>
                <body className="font-base bg-white">
                    <Header />
                    <main className="pb-20 md:pb-0" id="main">{children}</main>
                    <BottomNav />
                    <Toaster position="bottom-right" />
                </body>
            </html>
            <Analytics mode={'production'} />
        </>
    );
}
