import Gallery from '@/components/sections/home/gallery/Gallery';
import Hero from '@/components/sections/home/hero/Hero';
import Merch from '@/components/sections/home/merch/Merch';
import Performances from '@/components/sections/home/performances/Performances';
import Sponsors from '@/components/sections/home/sponsors/Sponsors';
import Timeline from '@/components/sections/home/timeline/Timeline';
const Home = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <Timeline />
      <Performances />
      <Merch />
      <Gallery />
    </>
  );
};

export default Home;
