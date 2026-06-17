import { useState, memo } from 'react';
import { playClick } from '../../lib/sound';
import joinNormal from '../../assets/images/join.png';
import joinHighlighted from '../../assets/images/join_highlighted.png';
import type { ContactEntry } from '../../data/contacts';
import { CONTACT_ICONS, CONTACT_COLORS } from '../../data/contacts';

interface ContactCardProps {
  entry: ContactEntry;
  selected: boolean;
  onSelect: (id: string) => void;
}

const ContactCard = memo(function ContactCard({ entry, selected, onSelect }: ContactCardProps) {
  const [joinHovered, setJoinHovered] = useState(false);
  const Icon = CONTACT_ICONS[entry.category];

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
      <div className="relative w-[72px] h-[72px] flex-shrink-0 bg-[#6b6b6b] border border-[#3a3a3a] rounded-sm overflow-hidden flex items-center justify-center">
        {Icon && <Icon className="w-10 h-10 text-white/70" />}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-10">
          <img
            src={joinHovered ? joinHighlighted : joinNormal}
            alt="Copy"
            className="w-14 h-14 cursor-pointer"
            onMouseEnter={() => setJoinHovered(true)}
            onMouseLeave={() => setJoinHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              if (entry.value.startsWith('http://') || entry.value.startsWith('https://')) {
                window.open(entry.value, '_blank');
              } else {
                navigator.clipboard.writeText(entry.value);
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-px min-w-0 flex-1">
        <span className="text-base font-semibold tracking-wide truncate mc-text-shadow-darker leading-tight">
          <span style={{ color: CONTACT_COLORS[entry.category] || '#aaaaaa' }}>{entry.title}</span>
        </span>
        <span className="text-sm text-white tracking-wide truncate mc-text-shadow-darker leading-tight">
          {entry.value}
        </span>
      </div>
    </div>
  );
});

export default ContactCard;
