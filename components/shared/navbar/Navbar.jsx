'use client';

import Logo from '@/public/svgs/tex-graffiti.svg';
import { ChartNoAxesGantt, CircleX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BrushLink from './BrushLink';

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [show, setShow] = useState(!isHome);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isIntro, setIsIntro] = useState(isHome);
  const [prevIsHome, setPrevIsHome] = useState(isHome);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync state with route changes during render to avoid flash
  if (isHome !== prevIsHome) {
    setPrevIsHome(isHome);
    if (isHome) {
      setShow(false);
      setIsIntro(true);
    } else {
      setShow(true);
      setIsIntro(false);
    }
  }

  useEffect(() => {
    if (!isHome) return;

    const timer = setTimeout(() => {
      setShow(true);
      setIsIntro(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isHome]);

  useEffect(() => {
    const handleScroll = () => {
      if (isIntro) return;
      if (isMenuOpen) return; // Don't hide navbar if menu is open

      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // scrolling down and scrolled a bit
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isIntro, isMenuOpen]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-large fixed top-0 z-150 w-full"
          // ref={hasInitialized}
        >
          <div className="relative">
            <div className="text-cream text-mini relative z-150 h-full w-full px-8 py-2">
              <ul className="z-200 flex items-center justify-between">
                <li>
                  <Link href="/">
                    <Logo className="h-auto w-14" />
                  </Link>
                </li>
                <li className="hidden md:block">
                  <ul className="flex items-center gap-4">
                    <li>
                      <BrushLink href="/">Home</BrushLink>
                    </li>
                    <li>
                      <BrushLink href="/gallery">Gallery</BrushLink>
                    </li>
                    <li>
                      <BrushLink href="/about">About</BrushLink>
                    </li>
                    <li>
                      <BrushLink href="/contact">Contact</BrushLink>
                    </li>
                  </ul>
                </li>
                <li className="hidden md:block">
                  <ul className="flex w-36 flex-col items-end gap-1">
                    <BrushLink href="/contact">Ayaschya</BrushLink>
                  </ul>
                </li>
                <li className="block md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 focus:outline-none"
                    aria-label="Toggle Menu"
                  >
                    {isMenuOpen ? <CircleX /> : <ChartNoAxesGantt />}
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '100dvh' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 z-140 h-dvh w-full overflow-hidden bg-black py-16 md:hidden"
                >
                  <ul className="text-cream flex flex-col items-center gap-6 py-8 pb-12">
                    <li onClick={() => setIsMenuOpen(false)}>
                      <BrushLink href="/">Home</BrushLink>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)}>
                      <BrushLink href="/gallery">Gallery</BrushLink>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)}>
                      <BrushLink href="/about">About</BrushLink>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)}>
                      <BrushLink href="/contact">Contact</BrushLink>
                    </li>
                    <li onClick={() => setIsMenuOpen(false)} className="mt-4">
                      <BrushLink href="/contact">Ayaschya</BrushLink>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute top-0 h-4 w-full bg-black md:h-2 xl:h-0"></div>

            <div className="absolute top-4 h-full w-full md:top-2 xl:-top-4">
              <Image
                src="/svgs/paper-edge.png"
                alt="Paper Edge"
                width={1834}
                height={90}
                className="block h-full w-auto object-cover brightness-80 sepia-50 md:h-auto md:w-full"
                priority
                style={{ zIndex: 10 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
