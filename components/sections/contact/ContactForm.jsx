'use client';
import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, User, Mail, MessageSquare, Phone } from 'lucide-react';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';
import Notification from '@/components/shared/toasts/Notification';

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
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});

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
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setNotification({
        type: 'error',
        message: 'Please fix the errors in the form',
      });
      return;
    }

    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit form');
      }

      // Success!
      setNotification({
        type: 'success',
        message: result.message || 'Your message has been sent successfully!',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});

      // Scroll to top to show notification
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
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
                    className={`w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20'
                    }`}
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
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
                    className={`w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
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
                    className={`w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20'
                    }`}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
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
                    className={`w-full rounded-lg border-2 bg-white py-4 pr-4 pl-12 transition-all duration-300 focus:ring-4 focus:outline-none ${
                      errors.subject
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20'
                    }`}
                  />
                </div>
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
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
                className={`w-full resize-none rounded-lg border-2 bg-white p-4 transition-all duration-300 focus:ring-4 focus:outline-none ${
                  errors.message
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-dark-text/20 focus:border-purple-rich focus:ring-purple-rich/20'
                }`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="form-element flex justify-center pt-4">
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
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
    </>
  );
};

export default ContactForm;
