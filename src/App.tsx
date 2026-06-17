import { useEffect, useState, useLayoutEffect } from 'react';
import { useUIStore } from './stores/uiStore';
import MainMenu from './pages/MainMenu';
import ProjectList from './pages/ProjectList';
import Contacts from './pages/Contacts';
import AboutMe from './pages/AboutMe';
import PanoramaBackground from './components/background/PanoramaBackground';
import LoadingScreen from './components/ui/LoadingScreen';
import panorama0 from './assets/images/panorama/panorama_0.png';
import panorama1 from './assets/images/panorama/panorama_1.png';
import panorama2 from './assets/images/panorama/panorama_2.png';
import panorama3 from './assets/images/panorama/panorama_3.png';
import panorama4 from './assets/images/panorama/panorama_4.png';
import panorama5 from './assets/images/panorama/panorama_5.png';

const panoramaFaces: [string, string, string, string, string, string] = [
  panorama0, panorama1, panorama2, panorama3, panorama4, panorama5,
];

const screens: Record<string, React.FC> = {
  MAIN_MENU: MainMenu,
  PROJECT_LIST: ProjectList,
  CONTACTS: Contacts,
  ABOUT_ME: AboutMe,
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const screen = useUIStore((s) => s.screen);
  const Screen = screens[screen] ?? MainMenu;
  const reduceMotion = useUIStore((s) => s.reduceMotion);
  const largeFont = useUIStore((s) => s.largeFont);
  const highContrast = useUIStore((s) => s.highContrast);

  // Fade overlay: only triggers on loading→main-menu transition, not on screen navigation
  const [fadeStage, setFadeStage] = useState<'hidden' | 'show' | 'fade'>('hidden');

  useEffect(() => {
    if (!loading) {
      setFadeStage('show');
    }
  }, [loading]);

  useLayoutEffect(() => {
    if (fadeStage === 'show') {
      const raf = requestAnimationFrame(() => setFadeStage('fade'));
      return () => cancelAnimationFrame(raf);
    }
  }, [fadeStage]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('reduce-motion', reduceMotion);
    root.classList.toggle('large-font', largeFont);
    root.classList.toggle('high-contrast', highContrast);
  }, [reduceMotion, largeFont, highContrast]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {fadeStage !== 'hidden' && (
        <div
          className="fixed inset-0 z-[100] bg-black pointer-events-none"
          style={{
            opacity: fadeStage === 'fade' ? 0 : 1,
            transition: fadeStage === 'fade' ? `opacity ${reduceMotion ? 0 : 800}ms ease` : 'none',
          }}
          onTransitionEnd={() => setFadeStage('hidden')}
        />
      )}

      <PanoramaBackground faces={panoramaFaces} />
      <Screen />
    </>
  );
}
