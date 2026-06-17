import { useState, memo } from 'react';
import { playClick } from '../../lib/sound';
import joinNormal from '../../assets/images/join.png';
import joinHighlighted from '../../assets/images/join_highlighted.png';
import type { ProjectEntry } from '../../data/projects';
import { LANG_COLORS } from '../../data/projects';

interface ProjectCardProps {
  entry: ProjectEntry;
  selected: boolean;
  onSelect: (id: string) => void;
}

const ProjectCard = memo(function ProjectCard({ entry, selected, onSelect }: ProjectCardProps) {
  const [joinHovered, setJoinHovered] = useState(false);

  return (
    <div
      className={`flex items-center gap-3.5 h-16 px-2.5 py-1.5 cursor-pointer rounded-sm relative border-2 group ${
        selected ? 'bg-black border-white' : 'border-transparent hover:bg-white/5'
      }`}
      role="option"
      aria-selected={selected}
      tabIndex={0}
      onClick={() => { playClick(); onSelect(entry.id); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playClick();
          onSelect(entry.id);
        }
      }}
    >
      <div className="relative w-[72px] h-[72px] flex-shrink-0 bg-[#6b6b6b] border border-[#3a3a3a] rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-10">
          <img
            src={joinHovered ? joinHighlighted : joinNormal}
            alt="Join"
            className="w-14 h-14 cursor-pointer"
            onMouseEnter={() => setJoinHovered(true)}
            onMouseLeave={() => setJoinHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              if (entry.url) window.open(entry.url, '_blank');
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-px min-w-0 flex-1">
        <span className="text-base font-semibold text-white tracking-wide truncate mc-text-shadow-darker leading-tight">
          {entry.title}
        </span>
        <span className="text-sm text-[#aaaaaa] tracking-wide truncate mc-text-shadow-darker leading-tight">
          {entry.summary}
        </span>
        <span className="text-sm text-[#aaaaaa] tracking-wide truncate mc-text-shadow-darker leading-tight">
          {entry.languages.map((lang, i) => (
            <span key={lang} className="font-medium" style={{ color: LANG_COLORS[lang] || '#aaaaaa' }}>
              {lang}{i < entry.languages.length - 1 ? <span className="text-[#666666]">, </span> : ''}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
});

export default ProjectCard;
