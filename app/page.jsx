import Gallery from '@/components/sections/home/gallery/Gallery';
import Hero from '@/components/sections/home/hero/Hero';
import Merch from '@/components/sections/home/merch/Merch';
import Performances from '@/components/sections/home/performances/Performances';
import Sponsors from '@/components/sections/home/sponsors/Sponsors';
import Events from '@/components/sections/home/events/Events';
import Timeline from '@/components/sections/home/timeline/Timeline';
import TornEdge from '@/components/shared/edges/TornEdge0';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';
import ComingSoon from '@/components/shared/utils/ComingSoon';
const Home = async () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <TornEdge
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#faf5ee"
      />
      <SpriteHeader
        heading="Timeline"
        spriteSrc="/spr-header.png"
        frames={24}
        orientation="vertical"
        frameAspectRatio={1280 / 720}
        brushColor="#000000" // Custom brush color
        bgColorClass="bg-sand-light"
        textColorClass="text-sand-light"
        duration={1.5}
      />
      <Timeline />
      <TornEdge
        upSectionColor="#faf5ee"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#000000"
      />
      {/* //TODO */}
      {/* <Performances /> */}
      <ComingSoon version="black" className="gap-12 py-16 text-center">
        <div className="text-2xl md:text-4xl">Performances Loading...</div>
        <div className="font-rubik-marker-hatch text-4xl md:text-8xl">Almost Showtime</div>
      </ComingSoon>

      <TornEdge
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#d4d4d4"
      />
      <Events />
      <TornEdge
        upSectionColor="#d4d4d4"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#000000"
      />
      <Merch />
      <TornEdge
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#faf5ee"
      />

      <ComingSoon className="gap-12 py-16 text-center">
        <div className="font-medieval-sharp text-6xl font-bold">Through the Lens</div>
        <div className="font-rubik-wet-paint text-4xl md:text-8xl">Worth the wait</div>
      </ComingSoon>

      {/* //TODO */}
      {/* <Gallery /> */}
      <TornEdge
        upSectionColor="var(--color-cream)"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#000000"
      />
    </>
  );
};

export default Home;
