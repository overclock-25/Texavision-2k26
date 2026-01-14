'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import BrushLink from './nav/BrushLink';
import NavEdge from './NavEdge';
import TornEdge0 from '../edges/TornEdge0';
import Logo from '@/public/svgs/tex-graffiti.svg';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
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
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-large fixed top-0 z-150 w-full"
        >
          <div className="relative">
            <div className="text-cream text-mini absolute z-150 h-full w-full px-8 py-2">
              <ul className="z-200 flex items-center justify-between">
                <li>
                  <Link href="/">
                    <Logo className="h-auto w-16" />
                  </Link>
                </li>
                <li>
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
                <li>
                  <ul className="flex w-36 flex-col items-end gap-1">
                    <li>Ayaschya</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="relative bg-black p-6"></div>
            {/* <NavEdge upSectionColor={"#000000"}/> */}
            <TornEdge0
              upSectionColor="rgba(0,0,0,1)"
              edgeColor="#e8dcc8"
              className="relative overflow-hidden"
              downSectionColor="transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
