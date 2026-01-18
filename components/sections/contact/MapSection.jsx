'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, MapPin } from 'lucide-react';
import { useBrushstroke } from '@/hooks/useBrushstroke';
import { useInView } from 'framer-motion';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';

gsap.registerPlugin(ScrollTrigger);

const BrushRevealMap = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const { draw } = useBrushstroke(canvasRef);
  const [isRevealed, setIsRevealed] = useState(false);
  const animationStartedRef = useRef(false);

  useEffect(() => {
    if (isInView && canvasRef.current && containerRef.current && !animationStartedRef.current) {
      animationStartedRef.current = true;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      // Fill canvas with overlay color first
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = '#e8dcc8'; // sand color
      ctx.fillRect(0, 0, width, height);

      // Create brush stroke points that cover the entire area
      const points = [];
      const rows = 8;
      const stepY = height / rows;

      for (let i = 0; i <= rows; i++) {
        const y = i * stepY;
        const jitterY = (Math.random() - 0.5) * 30;

        if (i % 2 === 0) {
          points.push(-100, y + jitterY);
          points.push(width + 100, y + jitterY);
        } else {
          points.push(width + 100, y + jitterY);
          points.push(-100, y + jitterY);
        }
      }

      // Draw with erase mode to reveal the map underneath
      draw({
        points: points,
        size: 150,
        inkAmount: 25,
        tension: 0.4,
        frames: 60,
        splashing: true,
        dripping: false,
        color: '#ffffff',
        erase: true,
        delay: 0.3,
        end: () => {
          setIsRevealed(true);
          // Fade out the canvas completely after animation
          if (canvasRef.current) {
            gsap.to(canvasRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        },
      });
    }
  }, [isInView, draw]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* The actual map iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.379291663788!2d88.35093467530574!3d22.75130117936489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89b0332447d5b%3A0x783ac24cb2925342!2sGovernment%20College%20of%20Engineering%20%26%20Textile%20Technology!5e0!3m2!1sen!2sin!4v1768714071943!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="GCETTS Location Map"
        className={`transition-all duration-1000 ${isRevealed ? 'grayscale-0' : 'grayscale'}`}
      />

      {/* Canvas overlay that gets "erased" by brush strokes */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" />

      {/* Loading placeholder - shown before in view */}
      {!isInView && (
        <div
          ref={overlayRef}
          className="bg-sand absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="text-center">
            <MapPin className="text-purple-rich mx-auto mb-4 h-16 w-16 animate-bounce" />
            <p className="font-grindy-brush text-dark-text text-2xl">Revealing Location...</p>
          </div>
        </div>
      )}

      {/* Decorative paint splatters */}
      <div className="bg-purple-rich/30 pointer-events-none absolute -top-4 -left-4 z-30 h-20 w-20 rounded-full blur-xl" />
      <div className="bg-teal/30 pointer-events-none absolute -right-4 -bottom-4 z-30 h-24 w-24 rounded-full blur-xl" />
      <div className="bg-rose-deep/20 pointer-events-none absolute top-1/2 -right-8 z-30 h-16 w-16 rounded-full blur-lg" />
    </div>
  );
};

const MapSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.map-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.map-button',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-sand-light px-4 py-20 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SpriteHeader
          heading="Find Us"
          spriteSrc="/spr-header.png"
          frames={24}
          orientation="vertical"
          frameAspectRatio={1280 / 720}
          brushColor="#7c3aed"
          bgColorClass="bg-sand-light"
          textColorClass="text-sand-light"
          duration={1.5}
        />
        <p className="map-title text-dark-text/70 mx-auto mb-12 max-w-2xl text-center text-lg">
          Located in the heart of Serampore, easily accessible from Kolkata
        </p>

        {/* Brush Reveal Map */}
        <div className="shadow-2xl">
          <BrushRevealMap className="h-[450px]" />
        </div>

        <div className="map-button mt-8 flex justify-center">
          <PrimaryButton
            href="https://maps.google.com/?q=Government+College+of+Engineering+and+Textile+Technology+Serampore"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation className="h-5 w-5" />
            Get Directions
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
