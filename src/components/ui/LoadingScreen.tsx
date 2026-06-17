import { useState, useEffect, useRef } from 'react';
import dirtBg from '../../assets/images/dirt.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LERP_FACTOR = 0.08;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [displayed, setDisplayed] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const targetRef = useRef(0);
  const displayedRef = useRef(0);
  const jumpRef = useRef(false);
  const pausedRef = useRef(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    cancelledRef.current = false;

    // --- Render loop (smooth tweening via rAF) ---
    let rafId: number;
    const render = () => {
      if (cancelledRef.current) return;
      rafId = requestAnimationFrame(render);
      const displayedCur = displayedRef.current;
      const targetCur = targetRef.current;

      if (jumpRef.current) {
        displayedRef.current = targetCur;
        jumpRef.current = false;
      } else if (Math.abs(displayedCur - targetCur) > 0.1) {
        displayedRef.current += (targetCur - displayedCur) * LERP_FACTOR;
      }

      setDisplayed(displayedRef.current);
    };
    rafId = requestAnimationFrame(render);

    // --- Progress scheduling loop (setTimeout-based) ---
    const scheduleNext = () => {
      if (cancelledRef.current) return;

      if (pausedRef.current) {
        const pauseDuration = 200 + Math.random() * 600;
        setTimeout(() => {
          if (cancelledRef.current) return;
          pausedRef.current = false;
          const jump = 5 + Math.random() * 10;
          targetRef.current = Math.min(targetRef.current + jump, 100);
          jumpRef.current = Math.random() < 0.5;
          if (targetRef.current >= 100) {
            setTimeout(() => {
              if (!cancelledRef.current) onCompleteRef.current();
            }, 400);
            return;
          }
          scheduleNext();
        }, pauseDuration);
        return;
      }

      // Decide next action
      const shouldPause = Math.random() < 0.15;

      if (shouldPause) {
        pausedRef.current = true;
        scheduleNext();
        return;
      }

      const increment = 1 + Math.random() * 3;
      targetRef.current = Math.min(targetRef.current + increment, 100);
      jumpRef.current = false;

      if (targetRef.current >= 100) {
        setTimeout(() => {
          if (!cancelledRef.current) onCompleteRef.current();
        }, 400);
        return;
      }

      const delay = 60 + Math.random() * 80;
      setTimeout(scheduleNext, delay);
    };

    scheduleNext();

    return () => {
      cancelledRef.current = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[#000000] z-[1]" />
      <div
        className="absolute inset-0 z-[2] bg-repeat [image-rendering:pixelated] opacity-[0.32]"
        style={{ backgroundImage: `url(${dirtBg})`, backgroundSize: '96px 96px' }}
      />
      <div className="relative z-[3] flex flex-col items-center gap-[6px]">
        <p className="text-[1rem] text-white mc-text-shadow mb-[9px]">Generating website</p>
        <p className="text-[1rem] text-white mc-text-shadow">Building structure</p>
        <div className="w-[254px] h-[6px] bg-[#808080]">
          <div
            className="h-full bg-[#66DD66]"
            style={{ width: `${Math.min(displayed, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
