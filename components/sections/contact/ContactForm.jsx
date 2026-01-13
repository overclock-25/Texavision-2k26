'use client';
import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, User, Mail, MessageSquare, Phone } from 'lucide-react';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        '.form-element',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: formRef }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={formRef} className="bg-sand-light px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <SpriteHeader
          heading="Drop Us a Line"
          spriteSrc="/spr-header.png"
          frames={24}
          orientation="vertical"
          frameAspectRatio={1280 / 720}
          brushColor="#7c3aed"
          bgColorClass="bg-sand-light"
          textColorClass="text-sand-light"
          duration={1.5}
        />
        <p className="form-element text-dark-text/70 mx-auto mb-12 max-w-2xl text-center text-lg">
          Have questions about Texavision 2k26? We&apos;d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div className="form-element group relative">
              <label
                htmlFor="name"
                className="text-dark-text mb-2 block text-sm font-medium tracking-wider uppercase"
              >
                Your Name
              </label>
              <div className="relative">
                <User className="text-purple-rich/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20 w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-element group relative">
              <label
                htmlFor="email"
                className="text-dark-text mb-2 block text-sm font-medium tracking-wider uppercase"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="text-purple-rich/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20 w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Phone Field */}
            <div className="form-element group relative">
              <label
                htmlFor="phone"
                className="text-dark-text mb-2 block text-sm font-medium tracking-wider uppercase"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="text-purple-rich/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20 w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="form-element group relative">
              <label
                htmlFor="subject"
                className="text-dark-text mb-2 block text-sm font-medium tracking-wider uppercase"
              >
                Subject
              </label>
              <div className="relative">
                <MessageSquare className="text-purple-rich/50 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20 w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div className="form-element group relative">
            <label
              htmlFor="message"
              className="text-dark-text mb-2 block text-sm font-medium tracking-wider uppercase"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell us what's on your mind..."
              className="border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20 w-full resize-none rounded-lg border-2 bg-white p-4 transition-all duration-300 focus:ring-4 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="form-element flex justify-center pt-4">
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : submitted ? (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
