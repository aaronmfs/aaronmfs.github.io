import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';
import MCButton from '../components/ui/MCButton';
import { CONTACTS } from '../data/contacts';
import ContactCard from '../components/features/ContactCard';

export default function Contacts() {
  const setScreen = useUIStore((s) => s.setScreen);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      search.trim()
        ? CONTACTS.filter(
            (c) =>
              c.title.toLowerCase().includes(search.toLowerCase()) ||
              c.value.toLowerCase().includes(search.toLowerCase()) ||
              c.category.toLowerCase().includes(search.toLowerCase())
          )
        : CONTACTS,
    [search]
  );

  useEffect(() => {
    if (selectedId && !filtered.some((c) => c.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  const selectContact = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleCopy = useCallback(() => {
    if (!selectedId) return;
    const entry = CONTACTS.find((c) => c.id === selectedId);
    if (!entry) return;
    if (entry.value.startsWith('http://') || entry.value.startsWith('https://')) {
      window.open(entry.value, '_blank');
    } else {
      navigator.clipboard.writeText(entry.value);
    }
  }, [selectedId]);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setSearch('');
        searchRef.current?.blur();
      }
    },
    []
  );

  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();

      const ids = filtered.map((c) => c.id);
      if (ids.length === 0) return;

      const currentIndex = selectedId ? ids.indexOf(selectedId) : -1;
      let nextIndex: number;

      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, ids.length - 1);
      } else {
        nextIndex = currentIndex < 0 ? ids.length - 1 : Math.max(currentIndex - 1, 0);
      }

      setSelectedId(ids[nextIndex]);
    },
    [filtered, selectedId]
  );

  return (
    <div className="fixed inset-0 z-10 flex flex-col pointer-events-none">
      <div className="flex-shrink-0 w-full bg-transparent border border-white/30 pointer-events-auto z-[3] flex flex-col items-center py-7 pb-5">
        <h1 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow mb-4 text-center whitespace-nowrap">
          Contacts
        </h1>
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search contacts..."
          className="block w-[26.25rem] max-w-[88vw] h-9 bg-[#0a0a0c] border-2 border-[#3a3a3a] text-[#cccccc] font-minecraft text-base tracking-wide px-3 outline-none rounded-sm caret-white focus:border-white focus:text-[#f0f0f0] transition-colors duration-150"
        />
      </div>

      <div
        ref={listRef}
        className="flex-1 w-full bg-black/30 backdrop-blur-sm overflow-y-auto pointer-events-auto relative z-10 outline-none mc-scrollbar"
        tabIndex={0}
        onKeyDown={handleListKeyDown}
      >
        <div className="w-[35rem] max-w-[92vw] mx-auto py-3 pb-4 flex flex-col gap-0.5">
          {filtered.length === 0 && search.trim() && (
            <div className="text-center text-[#777777] text-base tracking-wide py-8 mc-text-shadow">
              No results found
            </div>
          )}
          {filtered.map((entry) => (
            <ContactCard
              key={entry.id}
              entry={entry}
              selected={selectedId === entry.id}
              onSelect={selectContact}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 w-full bg-transparent border border-white/30 pointer-events-auto z-[3] flex flex-col items-center py-4 pb-5">
        <div className="w-[38rem] max-w-[92vw] flex flex-col gap-2">
          <div className="flex gap-1.5 w-full">
            <MCButton
              className="flex-1"
              disabled={!selectedId}
              title={selectedId ? `Copy: ${CONTACTS.find((c) => c.id === selectedId)?.value}` : 'Select a contact first'}
              onClick={handleCopy}
            >
              Copy Selected Contact
            </MCButton>
            <MCButton className="flex-1" onClick={() => setScreen('MAIN_MENU')}>
              Back
            </MCButton>
          </div>
        </div>
      </div>
    </div>
  );
}
