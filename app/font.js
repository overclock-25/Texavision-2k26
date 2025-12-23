import localFont from 'next/font/local';
import { Permanent_Marker } from 'next/font/google';

const justSans = localFont({
  src: [
    { path: '../assets/fonts/just-sans/JUST Sans Regular.otf', weight: '400', style: 'normal' },
  ],
  variable: '--font-just-sans',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-permanent-marker',
  display: 'swap',
});

const fonts = {
  justSans,
  permanentMarker,
};

export default fonts;
