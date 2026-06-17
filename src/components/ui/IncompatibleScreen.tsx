import dirtBg from '../../assets/images/dirt.png';

export default function IncompatibleScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[#000000] z-[1]" />
      <div
        className="absolute inset-0 z-[2] bg-repeat [image-rendering:pixelated] opacity-[0.32]"
        style={{ backgroundImage: `url(${dirtBg})`, backgroundSize: '96px 96px' }}
      />
      <div className="relative z-[3] flex flex-col items-center gap-4 px-6 max-w-[92vw]">
        <p className="text-[1rem] text-[#FFFF00] mc-text-shadow text-center leading-relaxed">
          Your screen is too small to contain this world.
        </p>
        <p className="text-[1rem] text-white mc-text-shadow text-center leading-relaxed">
          Try a desktop!
        </p>
      </div>
    </div>
  );
}
