'use client';
import React, { Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import RandomShapeRevealCanvas from '@/components/shared/utils/RandomShapeRevealCanvas';
import GraffitiText from './GraffitiText';
import { ContactUsLink } from '../home/hero/ContactUsLink';
// import PaintDripCanvas from './PaintDripCanvas';
// import FloatingElements from './FloatingElements';

const data = {
  title: 'Contact Us',
  subtitle: "We'd love to hear from you! Reach out and let's create something amazing together.",
};

const Header = ({
  title = data.title,
  subtitle = data.subtitle,
  subtitleColor = 'text-black/70',
  videoUrl = '/videos/contact-bg2.mp4',
}) => {
  const subtitleRef = React.useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 1.5 }
      );
    },
    { scope: null }
  );

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-black pt-20">
      {/* Paint Drip Effect from top */}
      {/* <PaintDripCanvas /> */}

      {/* Floating decorative elements */}
      {/* <FloatingElements /> */}
      <Suspense fallback={null}>
        <video
          className="absolute top-0 left-0 z-2 h-full w-full object-cover brightness-50"
          autoPlay
          loop
          muted
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Suspense>
      {/* <div className="absolute top-50 bg-linear-to-t from-black to-transparent h-1/2 z-10" /> */}

      {/* Background spray paint reveal */}
      <div className="absolute inset-0 z-5 flex items-center justify-center opacity-70">
        <RandomShapeRevealCanvas
          src="/images/png/spray-tp.png"
          height={600}
          width={1200}
          shapeCount={50}
          growthSpeed={2}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Interactive Graffiti Title */}
      <div className="relative z-20 mb-8">
        <GraffitiText text={title} />
      </div>

      {/* Subtitle with animation */}
      {/* <p
        ref={subtitleRef}
        className={`relative z-20 max-w-2xl px-4 text-center text-xl opacity-0 md:text-2xl ${subtitleColor}`}
      >
        {subtitle}
      </p> */}
      <ContactUsLink ref={subtitleRef} link="https://cal.com/texavision-2k26/30min" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          {/* <span className="text-dark-text/50 text-sm">Scroll to explore</span>
          <div className="bg-purple-rich h-12 w-6 rounded-full border-2 border-purple-300 p-1">
            <div className="bg-purple-rich h-2 w-2 animate-bounce rounded-full" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
