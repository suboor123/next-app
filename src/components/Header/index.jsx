'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, CpuChipIcon, HomeIcon, RectangleGroupIcon, RocketLaunchIcon, SwatchIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LazyImg from '../LazyImg';
import { usePathname, useRouter } from 'next/navigation';
import Banner from './Banner';
import HyperLink from '../HyperLink';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const onCloseDialog = () => {};
    const [isScrolled, setIsScrolled] = useState(false);
    const path = usePathname();
    const params = useRouter();

    const navigation = [
        { name: 'Home', href: '/', icon: <HomeIcon className="h-6 w-6 object-contain" />, isActive: path === '/' },
        { name: 'Projects', href: '/projects', icon: <WrenchScrewdriverIcon className="h-6 w-6 object-contain" />, isActive: path === '/services' },
        { name: 'Blogs', href: '/blogs', icon: <CpuChipIcon className="h-6 w-6 object-contain" />, isActive: path === '/technologies' },
        { name: 'LIVE Sessions', href: '/live-sessions', icon: <SwatchIcon className="h-6 w-6 object-contain" />, isActive: path === '/case-studies' },
        { name: 'Contact', href: '/contact', icon: <RectangleGroupIcon className="h-6 w-6 object-contain" />, isActive: path === '/blog' },
    ];

    const openContactPopup = () => {
        document.getElementById('contact-cta-btn')?.click();
    };

    useLayoutEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsScrolled(offset > 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={` ${isScrolled ? ' backdrop-blur-sm bg-white/70' : 'bg-transparent'} bg-white md:bg-transparent fixed w-full top-0 z-[99999] font-poppins `}>
            {/* <Banner /> */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:py-1 xl:px-0" aria-label="Global">
                <div className="flex items-center gap-x-12">
                    <a href="/" title="Suboor home" className="-m-1.5 p-1.5">
                        <span className="sr-only">Suboor Khan</span>
                        <LazyImg type="text/partytown" className="h-8 w-[160px]" src="/assets/logo.avif" alt="suboor_icon" title="suboor_icon" />
                    </a>
                    <div className="hidden lg:flex gap-10 xl:gap-12">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                title={item.name}
                                href={item.href}
                                className={`text-md font-normal leading-6 
        ${item.isActive ? 'text-primary' : 'text-gray-900'} 
        hover:text-primary 
        ${item.name === 'Technologies' ? 'hidden xl:flex' : 'xl:flex'}
      `}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3 lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden z-[1000] relative" open={mobileMenuOpen} onClose={onCloseDialog}>
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" title="Home" className="-m-1.5 p-1.5 flex sm:hidden">
                            <span className="sr-only">Suboor Khan</span>
                            <LazyImg className="h-8 w-[160px]" src="assets/logo.avif" alt="suboor_icon" title="suboor_icon" />
                        </a>
                        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a key={item.name} title={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-md font-normal leading-7 text-gray-900 hover:bg-gray-50">
                                        <div className="flex items-center gap-x-3">
                                            {item.icon} {item.name}
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div className="flex md:hidden items-center gap-3">
                                <a href="/hire-web-developer" className="tappable p-hint-links__item py-3">
                                    <div
                                        className="row m-h-10 align-c cursor font-poppins py-2 px-5 rounded-md text-white ib-header__experience-scaler-cta ib-header__experience-scaler-cta--animated"
                                        role="presentation"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="ib-header__experience-scaler-cta-icon">
                                            <rect width={256} height={256} fill="none" />
                                            <path d="M215.8,118.2a8,8,0,0,0-5-5.7L153.2,90.9l14.6-73.3a8.1,8.1,0,0,0-4.1-8.7,7.9,7.9,0,0,0-9.5,1.6l-112,120a7.9,7.9,0,0,0-2,7.3,8.2,8.2,0,0,0,5,5.7l57.6,21.6L88.2,238.4a8.1,8.1,0,0,0,4.1,8.7,8.4,8.4,0,0,0,3.7.9,7.9,7.9,0,0,0,5.8-2.5l112-120A7.9,7.9,0,0,0,215.8,118.2Z" />
                                        </svg>
                                        <span className="ib-header__experience-scaler-cta-text">Get a Website</span>
                                    </div>
                                </a>
                                <div className="py-3">
                                    <HyperLink rounded="md" title={'hire us'} href={'/hire-us'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                                            />
                                        </svg>
                                        Hire Us
                                    </HyperLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
