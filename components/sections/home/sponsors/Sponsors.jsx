'use client';

import Link from 'next/link';
import { MarqueeAnimation } from './Marquee';
import Image from 'next/image';
import { useBrushstroke } from '@/hooks/useBrushstroke';
import { useRef, useEffect } from 'react';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';

const sponsorsData = [
  {
    id: 1,
    name: 'Sponsor One',
    logoSrc: '/sponsors/sponsor1.png',
    website: 'https://sponsorone.com',
  },
  {
    id: 2,
    name: 'Sponsor Two',
    logoSrc: '/sponsors/sponsor2.png',
    website: 'https://sponsortwo.com',
  },
  {
    id: 3,
    name: 'Sponsor Three',
    logoSrc: '/sponsors/sponsor3.png',
    website: 'https://sponsorthree.com',
  },
  {
    id: 4,
    name: 'Sponsor Four',
    logoSrc: '/sponsors/sponsor4.png',
    website: 'https://sponsorfour.com',
  },
  {
    id: 5,
    name: 'Sponsor Five',
    logoSrc: '/sponsors/sponsor5.png',
    website: 'https://sponsorfive.com',
  },
  {
    id: 6,
    name: 'Sponsor Six',
    logoSrc: '/sponsors/sponsor6.png',
    website: 'https://sponsorsix.com',
  },
  {
    id: 7,
    name: 'Sponsor Seven',
    logoSrc: '/sponsors/sponsor7.png',
    website: 'https://sponsorseven.com',
  },
  {
    id: 8,
    name: 'Sponsor Eight',
    logoSrc: '/sponsors/sponsor8.png',
    website: 'https://sponsoreight.com',
  },
  {
    id: 9,
    name: 'Sponsor Nine',
    logoSrc: '/sponsors/sponsor9.png',
    website: 'https://sponsornine.com',
  },
  {
    id: 10,
    name: 'Sponsor Ten',
    logoSrc: '/sponsors/sponsor10.png',
    website: 'https://sponsorten.com',
  },
];

const Sponsors = () => {
  return (
    <div className="h-fit bg-black py-16">
      <div className="font-grindy-brush flex flex-col items-center justify-center gap-16 text-white">
        <h2 className="text-4xl">Our Sponsors</h2>
        <p className="font-drunk-millionaire! px-2 text-center text-4xl! md:text-7xl!">
          Will be REVEALED SOON
        </p>
      </div>

      {/* //TODO */}
      {/* <MarqueeAnimation duration={30} direction="left" className="p-8">
        {sponsorsData.map((sponsor) => (
          <Link href={sponsor.website} key={sponsor.id} className="bg-cream m-8 p-4">
            <Image height={100} width={100} src={sponsor.logoSrc} alt={sponsor.name} />
          </Link>
        ))}
      </MarqueeAnimation> */}
    </div>
  );
};

export default Sponsors;
