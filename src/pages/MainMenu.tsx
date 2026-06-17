import { useState, useCallback } from 'react';
import portfolioLogo from '../assets/images/portfolio_title.png';
import accessibilityIcon from '../assets/images/accessibility.png';
import { useUIStore } from '../stores/uiStore';
import MCButton from '../components/ui/MCButton';
import MCSplash from '../components/ui/MCSplash';
import { playClick } from '../lib/sound';
import { USERS } from '../data/users';

export default function MainMenu() {
  const setScreen = useUIStore((s) => s.setScreen);
  const reduceMotion = useUIStore((s) => s.reduceMotion);
  const setReduceMotion = useUIStore((s) => s.setReduceMotion);
  const largeFont = useUIStore((s) => s.largeFont);
  const setLargeFont = useUIStore((s) => s.setLargeFont);
  const highContrast = useUIStore((s) => s.highContrast);
  const setHighContrast = useUIStore((s) => s.setHighContrast);
  const triggerProjectReset = useUIStore((s) => s.triggerProjectReset);
  const loggedInUser = useUIStore((s) => s.loggedInUser);
  const setLoggedInUser = useUIStore((s) => s.setLoggedInUser);

  const [showOptions, setShowOptions] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(!loggedInUser);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const openOptions = useCallback(() => setShowOptions(true), []);
  const closeOptions = useCallback(() => setShowOptions(false), []);
  const openAccessibility = useCallback(() => setShowAccessibility(true), []);
  const closeAccessibility = useCallback(() => setShowAccessibility(false), []);

  const handleLogin = useCallback(() => {
    const user = USERS.find((u) => u.username === loginUsername && u.password === loginPassword);
    if (user) {
      setLoggedInUser(user);
      setShowLogin(false);
      setLoginUsername('');
      setLoginPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  }, [loginUsername, loginPassword, setLoggedInUser]);

  const handleLogout = useCallback(() => {
    setLoggedInUser(null);
    setShowLogin(true);
  }, [setLoggedInUser]);

  const handleResetProjects = useCallback(() => {
    triggerProjectReset();
    setShowOptions(false);
  }, [triggerProjectReset]);

  return (
    <>
      <div
        className="fixed inset-0 z-10 pointer-events-none overflow-hidden"
        style={{
          filter: showLogin ? 'blur(6px)' : 'blur(0px)',
          transition: 'filter 0.6s ease',
        }}
      >
        <div
          className="relative flex flex-col items-center justify-center h-full"
          style={{
            transform: showLogin ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        >
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
              title="Account"
              onClick={() => { playClick(); setShowAccount(true); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[30px] h-[30px]">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
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

          <div className="absolute bottom-2 left-4 text-[1rem] text-white pointer-events-none mc-text-shadow">
            {loggedInUser ? `${loggedInUser.fullName} (logged in as)` : 'Aaron Mathew F. Sinay'}
          </div>
          <div className="absolute bottom-2 right-4 text-[1rem] text-white pointer-events-none mc-text-shadow">
            Integrative Programming and Technologies
          </div>
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

      {showAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
          <div className="w-[26.25rem] max-w-[92vw] bg-[#1a1a1c] border-2 border-[#3a3a3a] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow text-center whitespace-nowrap">
              Account
            </h2>

            {loggedInUser ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Name</span>
                  <div className="text-sm text-[#e0e0e0] tracking-wide mc-text-shadow leading-relaxed bg-[#0a0a0c] border border-[#3a3a3a] rounded-sm px-3 py-2">
                    {loggedInUser.fullName}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Username</span>
                  <div className="text-sm text-[#e0e0e0] tracking-wide mc-text-shadow leading-relaxed bg-[#0a0a0c] border border-[#3a3a3a] rounded-sm px-3 py-2">
                    {loggedInUser.username}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Role</span>
                  <div className="text-sm text-[#e0e0e0] tracking-wide mc-text-shadow leading-relaxed bg-[#0a0a0c] border border-[#3a3a3a] rounded-sm px-3 py-2">
                    {loggedInUser.role}
                  </div>
                </div>
                <MCButton onClick={() => { handleLogout(); setShowAccount(false); }}>
                  Log Out
                </MCButton>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-relaxed text-center">
                  Not logged in
                </p>
                <MCButton onClick={() => { setShowAccount(false); setShowLogin(true); }}>
                  Login
                </MCButton>
              </div>
            )}

            <div className="flex gap-1.5 w-full mt-2">
              <MCButton className="flex-1" onClick={() => setShowAccount(false)}>
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

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
          <div className="w-[26.25rem] max-w-[92vw] bg-[#1a1a1c] border-2 border-[#3a3a3a] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow text-center whitespace-nowrap">
              Login
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Username</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => { setLoginUsername(e.target.value); setLoginError(''); }}
                  className="bg-[#0a0a0c] border border-[#3a3a3a] rounded-sm px-3 py-2 text-sm text-[#e0e0e0] tracking-wide outline-none focus:border-[#6a6a6a]"
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                  className="bg-[#0a0a0c] border border-[#3a3a3a] rounded-sm px-3 py-2 text-sm text-[#e0e0e0] tracking-wide outline-none focus:border-[#6a6a6a]"
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                />
              </div>

              {loginError && (
                <p className="text-sm text-[#ff6b6b] tracking-wide mc-text-shadow text-center">{loginError}</p>
              )}
            </div>

            <div className="flex gap-1.5 w-full mt-2">
              <MCButton className="flex-1" onClick={handleLogin}>
                Login
              </MCButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
