import Logo from '@/public/hero/texavision.svg';

const Loading = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-cover brightness-40"
        style={{ backgroundImage: `url('hero/bg.jpg')`, backgroundPosition: 'center' }}
      />
      <div className="hero absolute z-200 flex h-full w-full items-center justify-center">
        <Logo className="h-auto w-180" />
      </div>
    </div>
  );
};

export default Loading;
