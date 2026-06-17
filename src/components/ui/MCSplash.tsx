import { useState, useEffect } from 'react';
import SPLASHES from '../../data/splash';
import { useUIStore } from '../../stores/uiStore';

export default function MCSplash() {
  const [splash, setSplash] = useState('');
  const reduceMotion = useUIStore((s) => s.reduceMotion);

  useEffect(() => {
    setSplash(SPLASHES[Math.floor(Math.random() * SPLASHES.length)]);
  }, []);

  if (!splash) return null;

  let textSizeClass: string;
  let wrapClass = '';
  if (splash.length <= 15) {
    textSizeClass = 'text-[1.2rem]';
  } else if (splash.length <= 25) {
    textSizeClass = 'text-[1rem]';
  } else {
    textSizeClass = 'text-[0.85rem]';
    wrapClass = 'max-w-[160px]';
  }

  return (
    <div className="absolute -bottom-6 -right-32 -rotate-[20deg] pointer-events-none z-20">
      <span
        className={`font-minecraft text-[#FFFF00] ${textSizeClass} ${wrapClass} [text-shadow:_1px_1px_0_#000000,_-1px_-1px_0_#000000,_1px_-1px_0_#000000,_-1px_1px_0_#000000,_3px_3px_0_#8a7a30] leading-tight inline-block ${
          !reduceMotion ? 'animate-splash-breathe' : ''
        }`}
      >
        {splash}
      </span>
    </div>
  );
}
