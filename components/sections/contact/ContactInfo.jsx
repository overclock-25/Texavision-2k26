'use client';
import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';

gsap.registerPlugin(ScrollTrigger);

// Paint splatter SVG component
const PaintSplatter = ({ color = '#4c1d95', className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`pointer-events-none absolute ${className}`}
    style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
  >
    <path
      d="M50 10 C60 20, 80 15, 85 30 C90 45, 75 55, 80 70 C85 85, 65 90, 50 85 C35 90, 15 85, 20 70 C25 55, 10 45, 15 30 C20 15, 40 20, 50 10"
      fill={color}
    />
    <circle cx="25" cy="25" r="8" fill={color} />
    <circle cx="75" cy="75" r="6" fill={color} />
    <circle cx="80" cy="20" r="4" fill={color} />
    <circle cx="20" cy="80" r="5" fill={color} />
  </svg>
);

// Interactive card with paint reveal effect
const ContactInfoCard = ({ icon: Icon, title, children, delay = 0, accentColor = '#7c3aed' }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className="info-card group bg-dark-text relative overflow-hidden rounded-2xl p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, ${accentColor}30, transparent)`,
        }}
      />

      {/* Paint splatter decorations */}
      <PaintSplatter
        color={accentColor}
        className="-top-4 -right-4 h-16 w-16 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-60"
      />
      <PaintSplatter
        color="#fbbf24"
        className="-bottom-2 -left-2 h-10 w-10 opacity-0 transition-all duration-700 group-hover:-rotate-12 group-hover:opacity-50"
      />

      {/* Spray paint border effect */}
      <div className="group-hover:border-vanilla-cream/30 absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500" />

      {/* Icon with pulse animation */}
      <div className="relative z-10 mb-6 flex justify-center">
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
          style={{ backgroundColor: accentColor }}
        >
          {/* Pulse rings */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:animate-ping"
            style={{ backgroundColor: accentColor, animationDuration: '1.5s' }}
          />
          <div
            className="absolute -inset-2 rounded-full border-2 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
            style={{ borderColor: accentColor }}
          />
          <Icon className="relative z-10 h-10 w-10 text-white transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      {/* Title with underline animation */}
      <div className="relative z-10 mb-4">
        <h4 className="font-grindy-brush text-vanilla-cream text-3xl transition-colors duration-300">
          {title}
        </h4>
        <div
          className="mx-auto mt-2 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-16"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Content */}
      <div className="text-vanilla-cream/80 relative z-10 space-y-2 text-base">{children}</div>

      {/* Corner accent */}
      <div
        className="absolute right-0 bottom-0 h-0 w-0 transition-all duration-500 group-hover:h-16 group-hover:w-16"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accentColor}40 50%)`,
        }}
      />
    </div>
  );
};

// Magnetic social button with spray paint effect
const MagneticSocialButton = ({ href, icon: Icon, label, bgColor = '#4c1d95' }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn group relative flex flex-col items-center gap-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={label}
    >
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-110"
        style={{
          backgroundColor: bgColor,
          transform: `translate(${position.x}px, ${position.y}px)`,
          boxShadow: `0 10px 30px ${bgColor}50`,
        }}
      >
        {/* Spray paint dots around button */}
        <div className="absolute -inset-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: bgColor,
                top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
                left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
                transform: 'translate(-50%, -50%)',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        <Icon className="relative z-10 h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110" />
      </div>
      <span className="font-protest-revolution text-dark-text text-sm opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
};

const ContactInfo = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Staggered card entrance with scale
      gsap.fromTo(
        '.info-card',
        { y: 100, opacity: 0, scale: 0.9, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.section-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Social buttons stagger animation
      gsap.fromTo(
        '.social-btn',
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.social-section',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Follow us title animation
      gsap.fromTo(
        '.social-title',
        { y: 30, opacity: 0, letterSpacing: '0.5em' },
        {
          y: 0,
          opacity: 1,
          letterSpacing: '0.1em',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.social-section',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-vanilla-cream relative overflow-hidden px-4 py-24 md:px-8 lg:px-16"
    >
      {/* Background decorative elements */}
      <div className="bg-purple-rich/5 absolute top-20 left-10 h-32 w-32 rounded-full blur-3xl" />
      <div className="absolute right-10 bottom-20 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* SpriteHeader for "Get In Touch" */}
        <SpriteHeader
          heading="Get In Touch"
          spriteSrc="/spr-header.png"
          frames={24}
          orientation="vertical"
          frameAspectRatio={1280 / 720}
          brushColor="#4c1d95"
          bgColorClass="bg-vanilla-cream"
          textColorClass="text-vanilla-cream"
          duration={1.5}
        />

        <p className="section-subtitle text-dark-text/70 mx-auto mb-16 max-w-2xl text-center text-lg">
          Reach out to us through any of these channels. We&apos;re always excited to connect with
          fellow enthusiasts!
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ContactInfoCard icon={MapPin} title="Location" delay={0} accentColor="#7c3aed">
            <p>GCETTS</p>
            <p>Hooghly</p>
          </ContactInfoCard>

          <ContactInfoCard icon={Phone} title="Phone" delay={100} accentColor="#ec4899">
            <p>
              <a
                href="tel:+919876543210"
                className="transition-colors duration-200 hover:text-amber-400"
              >
                +91 98765 43210
              </a>
            </p>
            <p>
              <a
                href="tel:+919123456789"
                className="transition-colors duration-200 hover:text-amber-400"
              >
                +91 91234 56789
              </a>
            </p>
          </ContactInfoCard>

          <ContactInfoCard icon={Mail} title="Email" delay={200} accentColor="#06b6d4">
            <p>
              <a
                href="mailto:texavision@gcetts.ac.in"
                className="transition-colors duration-200 hover:text-amber-400"
              >
                texavision@gcetts.ac.in
              </a>
            </p>
            <p>
              <a
                href="mailto:info@texavision.com"
                className="transition-colors duration-200 hover:text-amber-400"
              >
                info@texavision.com
              </a>
            </p>
          </ContactInfoCard>

          <ContactInfoCard icon={Clock} title="Event Timing" delay={300} accentColor="#f59e0b">
            <p>January 25-28, 2026</p>
            <p className="mt-3 text-lg font-semibold text-amber-400">4 Days of Fun!</p>
          </ContactInfoCard>
        </div>

        {/* Social Links with spray paint theme */}
        <div className="social-section mt-20">
          <div className="relative mb-10 text-center">
            <h4 className="social-title font-grindy-brush text-dark-text text-4xl tracking-wider">
              Follow Us
            </h4>
            <div className="from-purple-rich mx-auto mt-3 h-1 w-24 rounded-full bg-linear-to-r via-pink-500 to-amber-400" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <MagneticSocialButton
              href="https://www.instagram.com/texavision_official/"
              icon={Instagram}
              label="Instagram"
              bgColor="#E4405F"
            />
            <MagneticSocialButton
              href="https://www.facebook.com/gcettsstudentsunion2k18"
              icon={Facebook}
              label="Facebook"
              bgColor="#1877F2"
            />
            <MagneticSocialButton
              href="https://twitter.com/texavision"
              icon={Twitter}
              label="Twitter"
              bgColor="#1DA1F2"
            />
            <MagneticSocialButton
              href="https://youtube.com/@texavision"
              icon={Youtube}
              label="YouTube"
              bgColor="#FF0000"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
