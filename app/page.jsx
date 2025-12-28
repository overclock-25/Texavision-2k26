import Gallery from '@/components/sections/home/gallery/Gallery';
import Hero from '@/components/sections/home/hero/Hero';
import Merch from '@/components/sections/home/merch/Merch';
import Performances from '@/components/sections/home/performances/Performances';
import Sponsors from '@/components/sections/home/sponsors/Sponsors';
import Timeline from '@/components/sections/home/timeline/Timeline';
import Header from '@/components/shared/texts/Header';
const Home = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <Header
        heading="Timeline"
        bgColorClass={'bg-sand'}
        textColorClass={'text-sand'}
        brushColor={'#000000'}
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
