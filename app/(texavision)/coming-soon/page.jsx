const ComingSoon = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/edit-stock.mp4" type="video/mp4" />
      </video>

      <span className="font-oi relative z-10 flex h-full w-full items-center justify-center bg-black pt-20 text-center text-[14vw] leading-none text-white mix-blend-multiply">
        Coming
        <br />
        Soon!
      </span>
    </div>
  );
};

export default ComingSoon;
