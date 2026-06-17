import { useState, useCallback } from 'react';
import portfolioLogo from '../assets/images/portfolio_title.png';
import accessibilityIcon from '../assets/images/accessibility.png';
import languageIcon from '../assets/images/language.png';
import { useUIStore } from '../stores/uiStore';
import MCButton from '../components/ui/MCButton';
import MCSplash from '../components/ui/MCSplash';
import { playClick } from '../lib/sound';

export default function MainMenu() {
  const setScreen = useUIStore((s) => s.setScreen);
  const reduceMotion = useUIStore((s) => s.reduceMotion);
  const setReduceMotion = useUIStore((s) => s.setReduceMotion);
  const largeFont = useUIStore((s) => s.largeFont);
  const setLargeFont = useUIStore((s) => s.setLargeFont);
  const highContrast = useUIStore((s) => s.highContrast);
  const setHighContrast = useUIStore((s) => s.setHighContrast);
  const triggerProjectReset = useUIStore((s) => s.triggerProjectReset);

  const [showOptions, setShowOptions] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const openOptions = useCallback(() => setShowOptions(true), []);
  const closeOptions = useCallback(() => setShowOptions(false), []);
  const openAccessibility = useCallback(() => setShowAccessibility(true), []);
  const closeAccessibility = useCallback(() => setShowAccessibility(false), []);

  const handleResetProjects = useCallback(() => {
    triggerProjectReset();
    setShowOptions(false);
  }, [triggerProjectReset]);

  return (
    <>
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-[518px] max-w-[85vw] pointer-events-auto flex flex-col items-center mb-6">
          <div className="mb-[8vh] -translate-y-10 relative flex justify-center">
            <img
              src={portfolioLogo}
              alt="Portfolio"
              className="max-w-full h-auto scale-[1.8] block"
              draggable={false}
            />
            <MCSplash />
          </div>

          <div className="w-full flex flex-col gap-[13px]">
            <MCButton onClick={() => setScreen('PROJECT_LIST')}>
              Project List
            </MCButton>
            <MCButton onClick={() => setScreen('CONTACTS')}>
              Contacts
            </MCButton>
            <MCButton onClick={() => setScreen('ABOUT_ME')}>
              About Me
            </MCButton>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 pointer-events-auto">
          <button
            className="mc-button-bg w-[60px] flex-none relative cursor-pointer flex items-center justify-center"
            title="Language"
            onClick={playClick}
          >
            <img src={languageIcon} alt="" className="w-[30px] h-[30px]" draggable={false} />
          </button>
          <div className="w-[518px] max-w-[85vw] flex gap-1.5">
            <MCButton className="flex-1" onClick={openOptions}>
              Options...
            </MCButton>
            <MCButton className="flex-1" onClick={() => window.location.href = 'https://github.com/aaronmfs/aaronmfs.github.io'}>
              Quit Web
            </MCButton>
          </div>
          <button
            className="mc-button-bg w-[60px] flex-none relative cursor-pointer flex items-center justify-center"
            title="Accessibility"
            onClick={() => { playClick(); openAccessibility(); }}
          >
            <img src={accessibilityIcon} alt="" className="w-[30px] h-[30px]" draggable={false} />
          </button>
        </div>

        <div className="fixed bottom-2 left-4 text-[1rem] text-white z-20 pointer-events-none mc-text-shadow">
          Aaron Mathew F. Sinay
        </div>
        <div className="fixed bottom-2 right-4 text-[1rem] text-white z-20 pointer-events-none mc-text-shadow">
          Integrative Programming and Technologies
        </div>
      </div>

      {showOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
          <div className="w-[26.25rem] max-w-[92vw] bg-[#1a1a1c] border-2 border-[#3a3a3a] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow text-center whitespace-nowrap">
              Options
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">About This Site</span>
                <div className="text-sm text-[#cccccc] tracking-wide mc-text-shadow leading-relaxed bg-[#0a0a0c] border border-[#3a3a3a] rounded-sm px-3 py-2">
                  <p>Version 1.0.0</p>
                  <p>Built with React, TypeScript, Tailwind CSS, Zustand</p>
                  <p className="mt-1">Minecraft UI theme inspired by the 1.14+ texture pack.</p>
                  <p className="mt-1">Button, icon, and panel assets by the creator.</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Project Data</span>
                <MCButton onClick={handleResetProjects}>
                  Reset Projects to Default
                </MCButton>
              </div>
            </div>

            <div className="flex gap-1.5 w-full mt-2">
              <MCButton className="flex-1" onClick={closeOptions}>
                Done
              </MCButton>
            </div>
          </div>
        </div>
      )}

      {showAccessibility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
          <div className="w-[26.25rem] max-w-[92vw] bg-[#1a1a1c] border-2 border-[#3a3a3a] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow text-center whitespace-nowrap">
              Accessibility
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Reduce Motion</span>
                <button
                  className={`w-10 h-6 rounded-sm border-2 flex items-center transition-colors duration-100 ${
                    reduceMotion ? 'bg-[#4ade80] border-[#4ade80] justify-end' : 'bg-[#3a3a3a] border-[#555] justify-start'
                  }`}
                  onClick={() => { playClick(); setReduceMotion(!reduceMotion); }}
                >
                  <div className="w-4 h-4 rounded-sm bg-white mx-0.5" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Large Font</span>
                <button
                  className={`w-10 h-6 rounded-sm border-2 flex items-center transition-colors duration-100 ${
                    largeFont ? 'bg-[#4ade80] border-[#4ade80] justify-end' : 'bg-[#3a3a3a] border-[#555] justify-start'
                  }`}
                  onClick={() => { playClick(); setLargeFont(!largeFont); }}
                >
                  <div className="w-4 h-4 rounded-sm bg-white mx-0.5" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">High Contrast</span>
                <button
                  className={`w-10 h-6 rounded-sm border-2 flex items-center transition-colors duration-100 ${
                    highContrast ? 'bg-[#4ade80] border-[#4ade80] justify-end' : 'bg-[#3a3a3a] border-[#555] justify-start'
                  }`}
                  onClick={() => { playClick(); setHighContrast(!highContrast); }}
                >
                  <div className="w-4 h-4 rounded-sm bg-white mx-0.5" />
                </button>
              </div>
            </div>

            <div className="flex gap-1.5 w-full mt-2">
              <MCButton className="flex-1" onClick={closeAccessibility}>
                Done
              </MCButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
