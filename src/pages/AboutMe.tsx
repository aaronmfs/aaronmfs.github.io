import { useUIStore } from '../stores/uiStore';
import MCButton from '../components/ui/MCButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  LANG_SKILLS, SKILL_LANG_COLORS,
  CAT_SKILLS, CAT_COLORS, BIO,
} from '../data/skills';

export default function AboutMe() {
  const setScreen = useUIStore((s) => s.setScreen);

  return (
    <div className="fixed inset-0 z-10 flex flex-col pointer-events-none">
      <div className="flex-shrink-0 w-full bg-transparent border border-white/30 pointer-events-auto z-[3] flex flex-col items-center py-7 pb-5">
        <h1 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow mb-4 text-center whitespace-nowrap">
          About Me
        </h1>
        <h2 className="font-minecraft text-[1rem] tracking-wide text-[#aaaaaa] mc-text-shadow text-center whitespace-nowrap">
          Aaron Mathew F. Sinay
        </h2>
      </div>

      <div className="flex-1 w-full bg-black/30 backdrop-blur-sm overflow-y-auto pointer-events-auto relative z-10 outline-none mc-scrollbar">
        <div className="w-[35rem] max-w-[92vw] mx-auto py-3 pb-4 flex flex-col gap-3">
          <div className="overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap mc-text-shadow-darker text-base font-semibold animate-scroll-reverse">
              {CAT_SKILLS.map((s) => (
                <span key={s} style={{ color: CAT_COLORS[s] }}>{s}</span>
              ))}
              {CAT_SKILLS.map((s) => (
                <span key={s + '-dup'} style={{ color: CAT_COLORS[s] }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap mc-text-shadow-darker text-base font-semibold animate-scroll">
              {LANG_SKILLS.map((s) => (
                <span key={s} style={{ color: SKILL_LANG_COLORS[s] }}>{s}</span>
              ))}
              {LANG_SKILLS.map((s) => (
                <span key={s + '-dup'} style={{ color: SKILL_LANG_COLORS[s] }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="prose prose-invert max-w-none mc-text-shadow-darker leading-relaxed [&_p]:my-5 [&_h1]:text-[1.5rem] [&_h2]:text-[1.25rem] [&_h3]:text-[1.125rem] [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:mt-5 [&_h3]:mb-2 [&_hr]:my-6 [&_ul]:my-3 [&_li]:my-1 [&_table]:my-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{BIO}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 w-full bg-transparent border border-white/30 pointer-events-auto z-[3] flex flex-col items-center py-4 pb-5">
        <div className="w-[38rem] max-w-[92vw] flex flex-col gap-2">
          <div className="flex gap-1.5 w-full">
            <MCButton className="flex-1" onClick={() => setScreen('MAIN_MENU')}>
              Back
            </MCButton>
          </div>
        </div>
      </div>
    </div>
  );
}
