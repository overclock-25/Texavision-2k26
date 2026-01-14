import Logo from '@/public/hero/texavision.svg';

const Loading = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-cover brightness-40"
        style={{ backgroundImage: `url('hero/bg.jpg')`, backgroundPosition: 'center' }}
      />
    </div>
  );
};

export default Loading;
