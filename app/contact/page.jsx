import React from 'react';
import Header from '@/components/sections/contact/Header';
import ContactInfo from '@/components/sections/contact/ContactInfo';
import ContactForm from '@/components/sections/contact/ContactForm';
import MapSection from '@/components/sections/contact/MapSection';
import FAQ from '@/components/sections/contact/FAQ';
// import InteractiveSection from '@/components/sections/contact/InteractiveSection';
// import ParticleBackground from '@/components/sections/contact/ParticleBackground';
import TornEdge0 from '@/components/shared/edges/TornEdge0';

const Contact = () => {
  return (
    <div className="relative flex flex-col">
      {/* Particle Background Effect */}
      {/* <ParticleBackground /> */}

      {/* Hero Header Section with Graffiti Text & Paint Drips */}
      <Header subtitleColor="text-white/70" videoUrl="/videos/about-bg.mp4" />

      {/* Interactive Spray Paint Canvas Section */}
      <TornEdge0
        upSectionColor="#000000"
        // upSectionColor="#fef3c7"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#faf5ee"
      />
      {/* <InteractiveSection /> */}

      {/* Contact Form Section */}
      {/* <TornEdge0
        upSectionColor="#faf7f2"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#faf5ee"
        /> */}
      <ContactForm />

      {/* Contact Info Cards */}
      <TornEdge0
        upSectionColor="#faf5ee"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#fef3c7"
      />
      <ContactInfo />

      {/* Map Section */}
      <TornEdge0
        upSectionColor="#fef3c7"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#000000"
      />
      <FAQ />

      {/* Transition to Footer */}
      <TornEdge0
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#faf5ee"
      />
      <MapSection />

      {/* FAQ Section */}
      <TornEdge0
        upSectionColor="#faf5ee"
        edgeColor="#ffffff"
        className="-mt-px overflow-hidden"
        downSectionColor="#000000"
      />
    </div>
  );
};

export default Contact;
