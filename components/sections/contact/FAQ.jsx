'use client';
import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'When is Texavision 2k26?',
    answer:
      'Texavision 2k26 is scheduled to take place from February 15-17, 2026. It will be a 3-day extravaganza filled with events, performances, and fun activities.',
  },
  {
    question: 'How can I register for events?',
    answer:
      'You can register for events through our official website. Keep an eye on our social media handles for registration announcements and early bird offers.',
  },
  {
    question: 'Is there an entry fee?',
    answer:
      'Entry details and pricing will be announced closer to the event date. Follow us on Instagram and Facebook for the latest updates on tickets and passes.',
  },
  {
    question: 'Can students from other colleges participate?',
    answer:
      'Absolutely! Texavision welcomes participants from all colleges. Some events may have specific eligibility criteria which will be mentioned in the event details.',
  },
  {
    question: 'How do I reach the venue?',
    answer:
      'GCETTS is located in Serampore, Hooghly. You can reach us via Serampore Railway Station (5 mins walk) or by road from Kolkata (approximately 30-40 mins via GT Road).',
  },
  {
    question: 'Are there accommodation facilities?',
    answer:
      'We provide limited accommodation for outstation participants. Please contact us in advance to book your stay during the fest.',
  },
];

const FAQItem = ({ faq, isOpen, onClick, index }) => {
  return (
    <div
      className="faq-item bg-cream mb-4 overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-protest-revolution text-dark-text pr-4 text-lg md:text-xl">
          {faq.question}
        </span>
        <ChevronDown
          className={`text-purple-rich h-6 w-6 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-dark-text/70 px-6 pb-5 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.faq-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section ref={sectionRef} className="bg-vanilla-cream px-4 py-20 md:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <SpriteHeader
          heading="Got Questions?"
          spriteSrc="/spr-header.png"
          frames={24}
          orientation="vertical"
          frameAspectRatio={1280 / 720}
          brushColor="#4c1d95"
          bgColorClass="bg-vanilla-cream"
          textColorClass="text-vanilla-cream"
          duration={1.5}
        />
        <p className="faq-title text-dark-text/70 mx-auto mb-12 max-w-2xl text-center text-lg">
          We&apos;ve got answers! Check out our frequently asked questions.
        </p>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
