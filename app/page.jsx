import Gallery from '@/components/sections/home/gallery/Gallery';
import Hero from '@/components/sections/home/hero/Hero';
import Merch from '@/components/sections/home/merch/Merch';
import Performances from '@/components/sections/home/performances/Performances';
import Sponsors from '@/components/sections/home/sponsors/Sponsors';
import Events from '@/components/sections/home/events/Events';
import Timeline from '@/components/sections/home/timeline/Timeline';
import TornEdge from '@/components/shared/edges/TornEdge0';
import SpriteHeader from '@/components/shared/texts/SpriteHeader';
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
      <Performances />
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
      <Gallery />
      <TornEdge
        upSectionColor="#ffffff"
        edgeColor="#ffffff"
        className="overflow-hidden"
        downSectionColor="#000000"
      />
    </>
  );
};

export default Home;
