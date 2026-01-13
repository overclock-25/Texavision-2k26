import Gallery from '@/components/sections/home/gallery/Gallery';
import Hero from '@/components/sections/home/hero/Hero';
import Merch from '@/components/sections/home/merch/Merch';
import Performances from '@/components/sections/home/performances/Performances';
import Sponsors from '@/components/sections/home/sponsors/Sponsors';
import Timeline from '@/components/sections/home/timeline/Timeline';
import TornEdge from '@/components/shared/edges/TornEdge0';
import Header from '@/components/shared/texts/Header';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';
const Home = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <TornEdge
        upSectionColor="#000000"
        edgeColor="#ffffff"
        className="mt-[-1px] overflow-hidden"
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
      <Performances />
      <Merch />
      <Gallery />
      {/* Remove when whole page is done, this is for poster scroll */}
      <div className="h-[200vh]"></div>
    </>
  );
};

export default Home;
