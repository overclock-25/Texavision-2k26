'use client';

import Image from 'next/image';
import background from '@/assets/images/home/backWall.jpg';

// Placeholder event data - replace with actual data
const eventsData = [
  {
    id: 1,
    image: '/events/1.jpg',
  },
  {
    id: 2,
    image: '/events/4.jpg',
  },
  {
    id: 3,
    image: '/events/3.jpg',
  },
  {
    id: 4,
    image: '/events/2.jpg',
  },
  {
    id: 5,
    image: '/events/6.jpg',
  },
  {
    id: 6,
    image: '/events/5.jpg',
  },
];

const EventCard = ({ event }) => {
  return (
    <div className="group relative overflow-hidden rounded-sm bg-black/20 shadow-lg">
      {/* Event Image */}
      <div className="relative aspect-8/12 overflow-hidden">
        <Image
          src={event.image}
          alt={`Event ${event.id}`}
          fill
          className="object-fit transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
};

const Events = () => {
  return (
    <section className="relative min-h-screen overflow-hidden py-16">
      {/* Background Image */}
      <Image src={background} alt="Background" className="object-cover" fill priority />

      {/* Top Gradient - fade to white */}
      <div className="absolute top-0 right-0 left-0 z-1 h-32 bg-linear-to-t from-transparent to-[#d4d4d4]" />

      {/* Bottom Gradient - fade to white */}
      <div className="absolute right-0 bottom-0 left-0 z-1 h-32 bg-linear-to-b from-transparent to-[#d4d4d4]" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-grindy-brush text-4xl tracking-wide text-black uppercase md:text-5xl lg:text-6xl">
            Events
          </h2>
          {/* <h2 className="font-grindy-brush text-4xl uppercase tracking-wide text-black md:text-5xl lg:text-6xl">
            Graffiti Designs
          </h2> */}
        </div>

        {/* Events Grid */}
        <div className="mx-auto max-w-4xl lg:max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
