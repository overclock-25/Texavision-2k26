'use client';

import React from 'react';
// import Link from "next/link";
import footer from '@/assets/images/shared/footer.webp';
import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';

const Footer2 = () => {
  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background Image */}
      <Image src={footer} alt="Footer Background" fill className="object-cover" priority />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Top Gradient */}
      <div className="absolute top-0 right-0 left-0 h-24 bg-linear-to-b from-black to-transparent" />

      {/* Bottom Gradient */}
      <div className="absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto max-w-[2000px]">
        {/* Social Icons - Top Right */}
        <div className="flex justify-end gap-4 px-6 pt-4">
          <a
            href="https://www.instagram.com/texavision_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 transition-opacity hover:opacity-80"
          >
            <Instagram size={32} className="text-white" />
          </a>
          <a
            href="https://www.facebook.com/gcettsstudentsunion2k18?mibextid=rS40aB7S9Ucbxw6v"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 transition-opacity hover:opacity-80"
          >
            <Facebook size={32} className="text-white" />
          </a>
        </div>

        <Image
          width={1000}
          height={500}
          src="/svgs/logo.svg"
          alt="Texavision Logo"
          className="mx-auto h-auto w-[95%] justify-center pt-8 pb-4"
        />

        <div className="px-2 pb-4 md:px-4">
          <div className="flex flex-col-reverse items-center justify-center border-t-[1.5px] border-[rgba(255,255,255,0.15)] pt-4 text-sm text-[#7B7B7B] md:flex-row">
            <span className="text-center">© 2026 Texavision. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
