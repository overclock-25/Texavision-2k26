import localFont from 'next/font/local';
import {
  Protest_Revolution,
  Nosifer,
  MedievalSharp,
  Rubik_Doodle_Shadow,
  Rubik_Marker_Hatch,
  Rubik_Maps,
  Rubik_Wet_Paint,
  Rubik_Glitch_Pop,
} from 'next/font/google';

const abegnale = localFont({
  src: [{ path: '../assets/fonts/abegnale/Abegnale.ttf', weight: '400', style: 'normal' }],
  variable: '--font-abegnale',
  display: 'swap',
});

const centrion = localFont({
  src: [{ path: '../assets/fonts/centrion/Centrion-Regular.otf', weight: '400', style: 'normal' }],
  variable: '--font-centrion',
  display: 'swap',
});

const drunkMillionaire = localFont({
  src: [
    {
      path: '../assets/fonts/drunk-millionaire/DrunkMillionaire.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-drunk-millionaire',
  display: 'swap',
});

const gillianJoe = localFont({
  src: [{ path: '../assets/fonts/gillian-joe/Gillian-Joe.otf', weight: '400', style: 'normal' }],
  variable: '--font-gillian-joe',
  display: 'swap',
});

const grindyBrush = localFont({
  src: [{ path: '../assets/fonts/grindy-brush/GrindyBrush.otf', weight: '400', style: 'normal' }],
  variable: '--font-grindy-brush',
  display: 'swap',
});

const sprayPaintDemo = localFont({
  src: [
    {
      path: '../assets/fonts/spray-paint-demo/SprayPaintDemoRegular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-spray-paint-demo',
  display: 'swap',
});

const protestRevolution = Protest_Revolution({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-protest-revolution',
  display: 'swap',
});

const nosifer = Nosifer({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nosifer',
  display: 'swap',
});

const rubikDoodleShadow = Rubik_Doodle_Shadow({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-doodle-shadow',
  display: 'swap',
});

const rubikGlitchPop = Rubik_Glitch_Pop({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-glitch-pop',
  display: 'swap',
});
const rubikWetPaint = Rubik_Wet_Paint({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-wet-paint',
  display: 'swap',
});

const rubikMarkerHatch = Rubik_Marker_Hatch({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-marker-hatch',
  display: 'swap',
});

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-medieval-sharp',
  display: 'swap',
});

const rubikMaps = Rubik_Maps({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-maps',
  display: 'swap',
});

const fonts = {
  abegnale,
  centrion,
  drunkMillionaire,
  gillianJoe,
  grindyBrush,
  sprayPaintDemo,
  protestRevolution,
  nosifer,
  rubikDoodleShadow,
  rubikGlitchPop,
  rubikWetPaint,
  rubikMarkerHatch,
  medievalSharp,
  rubikMaps,
};

export default fonts;
