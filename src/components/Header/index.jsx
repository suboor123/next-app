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
                          
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
