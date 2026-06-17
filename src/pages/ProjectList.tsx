import { useState, useMemo, useCallback, useRef, useEffect, Fragment } from 'react';
import { useUIStore } from '../stores/uiStore';
import MCButton from '../components/ui/MCButton';
import { INITIAL_PROJECTS, LANG_NORMALIZE } from '../data/projects';
import type { ProjectEntry } from '../data/projects';
import ProjectCard from '../components/features/ProjectCard';

export default function ProjectList() {
  const setScreen = useUIStore((s) => s.setScreen);
  const projectResetKey = useUIStore((s) => s.projectResetKey);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createTitle, setCreateTitle] = useState('');
  const [createDesc, setCreateDesc] = useState('');
  const [createLangs, setCreateLangs] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLangs, setEditLangs] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const editTitleRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () =>
      search.trim()
        ? projects.filter(
            (p) =>
              p.title.toLowerCase().includes(search.toLowerCase()) ||
              p.summary.toLowerCase().includes(search.toLowerCase()) ||
              p.languages.some((l) => l.toLowerCase().includes(search.toLowerCase()))
          )
        : projects,
    [search, projects]
  );

  useEffect(() => {
    if (selectedId && !filtered.some((p) => p.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  useEffect(() => {
    setProjects(INITIAL_PROJECTS);
    setSelectedId(null);
  }, [projectResetKey]);

  const selectProject = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    setProjects((prev) => prev.filter((p) => p.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const handleRecreate = useCallback(() => {
    if (!selectedId) return;
    setProjects((prev) => {
      const original = prev.find((p) => p.id === selectedId);
      if (!original) return prev;
      const copy: ProjectEntry = {
        ...original,
        id: original.id + '-copy-' + Date.now(),
        title: 'Copy of ' + original.title,
      };
      return [...prev, copy];
    });
  }, [selectedId]);

  const openCreateModal = useCallback(() => {
    setCreateTitle('');
    setCreateDesc('');
    setCreateLangs('');
    setShowCreateModal(true);
    setTimeout(() => titleRef.current?.focus(), 50);
  }, []);

  const closeCreateModal = useCallback(() => {
    setShowCreateModal(false);
  }, []);

  const handleCreateSave = useCallback(() => {
    const title = createTitle.trim();
    const desc = createDesc.trim();
    if (!title) return;

    const langs = createLangs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => LANG_NORMALIZE[s.toLowerCase()] || s);

    const newEntry: ProjectEntry = {
      id: 'proj-' + Date.now(),
      title,
      summary: desc,
      languages: langs,
    };

    setProjects((prev) => [...prev, newEntry]);
    setShowCreateModal(false);
  }, [createTitle, createDesc, createLangs]);

  const openEditModal = useCallback(() => {
    if (!selectedId) return;
    const entry = projects.find((p) => p.id === selectedId);
    if (!entry) return;
    setEditTitle(entry.title);
    setEditDesc(entry.summary);
    setEditLangs(entry.languages.join(', '));
    setShowEditModal(true);
    setTimeout(() => editTitleRef.current?.focus(), 50);
  }, [selectedId, projects]);

  const closeEditModal = useCallback(() => {
    setShowEditModal(false);
  }, []);

  const handleEditSave = useCallback(() => {
    const title = editTitle.trim();
    const desc = editDesc.trim();
    if (!title || !selectedId) return;

    const langs = editLangs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => LANG_NORMALIZE[s.toLowerCase()] || s);

    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedId ? { ...p, title, summary: desc, languages: langs } : p
      )
    );
    setShowEditModal(false);
  }, [editTitle, editDesc, editLangs, selectedId]);

  const handleGoto = useCallback(() => {
    if (!selectedId) return;
    const entry = projects.find((p) => p.id === selectedId);
    if (entry?.url) window.open(entry.url, '_blank');
  }, [selectedId, projects]);

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

      const ids = filtered.map((p) => p.id);
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
    <Fragment>
    <div className="fixed inset-0 z-10 flex flex-col pointer-events-none">
      <div className="flex-shrink-0 w-full bg-transparent border border-white/30 pointer-events-auto z-[3] flex flex-col items-center py-7 pb-5">
        <h1 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow mb-4 text-center whitespace-nowrap">
          Project Lists
        </h1>
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search projects..."
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
            <ProjectCard
              key={entry.id}
              entry={entry}
              selected={selectedId === entry.id}
              onSelect={selectProject}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 w-full bg-transparent border border-white/30 pointer-events-auto z-[3] flex flex-col items-center py-4 pb-5">
        <div className="w-[38rem] max-w-[92vw] flex flex-col gap-2">
          <div className="flex gap-1.5 w-full">
            <MCButton
              className="flex-1"
              disabled={!selectedId || !projects.find((p) => p.id === selectedId)?.url}
              title={
                selectedId
                  ? `Go to: ${projects.find((p) => p.id === selectedId)?.title}`
                  : 'Select a project first'
              }
              onClick={handleGoto}
            >
              Goto Select Project
            </MCButton>
            <MCButton className="flex-1" onClick={openCreateModal}>
              Create New Project
            </MCButton>
          </div>
          <div className="flex gap-1.5 w-full">
            <MCButton
              className="flex-1"
              disabled={!selectedId}
              title={selectedId ? `Edit: ${projects.find((p) => p.id === selectedId)?.title}` : 'Select a project first'}
              onClick={openEditModal}
            >
              Edit
            </MCButton>
            <MCButton
              className="flex-1"
              disabled={!selectedId}
              title={selectedId ? `Delete: ${projects.find((p) => p.id === selectedId)?.title}` : 'Select a project first'}
              onClick={handleDelete}
            >
              Delete
            </MCButton>
            <MCButton
              className="flex-1 whitespace-nowrap"
              disabled={!selectedId}
              title={selectedId ? `Re-create: ${projects.find((p) => p.id === selectedId)?.title}` : 'Select a project first'}
              onClick={handleRecreate}
            >
              Re-create
            </MCButton>
            <MCButton
              className="flex-1"
              onClick={() => setScreen('MAIN_MENU')}
            >
              Back
            </MCButton>
          </div>
        </div>
      </div>
    </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
          <div className="w-[26.25rem] max-w-[92vw] bg-[#1a1a1c] border-2 border-[#3a3a3a] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow text-center whitespace-nowrap">
              Create New Project
            </h2>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Title</span>
              <input
                ref={titleRef}
                type="text"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
                placeholder="Project title..."
                className="block w-full h-9 bg-[#0a0a0c] border-2 border-[#3a3a3a] text-[#cccccc] font-minecraft text-base tracking-wide px-3 outline-none rounded-sm caret-white focus:border-white focus:text-[#f0f0f0] transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Description</span>
              <textarea
                value={createDesc}
                onChange={(e) => setCreateDesc(e.target.value)}
                placeholder="Project description..."
                rows={2}
                className="block w-full bg-[#0a0a0c] border-2 border-[#3a3a3a] text-[#cccccc] font-minecraft text-base tracking-wide px-3 py-1.5 outline-none rounded-sm caret-white resize-none focus:border-white focus:text-[#f0f0f0] transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Languages Used</span>
              <input
                type="text"
                value={createLangs}
                onChange={(e) => setCreateLangs(e.target.value)}
                placeholder="e.g. C++, Java, Python"
                className="block w-full h-9 bg-[#0a0a0c] border-2 border-[#3a3a3a] text-[#cccccc] font-minecraft text-base tracking-wide px-3 outline-none rounded-sm caret-white focus:border-white focus:text-[#f0f0f0] transition-colors duration-150"
              />
            </div>

            <div className="flex gap-1.5 w-full mt-2">
              <MCButton className="flex-1" onClick={handleCreateSave}>
                Save
              </MCButton>
              <MCButton className="flex-1" onClick={closeCreateModal}>
                Cancel
              </MCButton>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
          <div className="w-[26.25rem] max-w-[92vw] bg-[#1a1a1c] border-2 border-[#3a3a3a] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-minecraft text-[1.25rem] font-bold tracking-wider text-[#e0e0e0] mc-text-shadow text-center whitespace-nowrap">
              Edit Project
            </h2>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Title</span>
              <input
                ref={editTitleRef}
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Project title..."
                className="block w-full h-9 bg-[#0a0a0c] border-2 border-[#3a3a3a] text-[#cccccc] font-minecraft text-base tracking-wide px-3 outline-none rounded-sm caret-white focus:border-white focus:text-[#f0f0f0] transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Description</span>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Project description..."
                rows={2}
                className="block w-full bg-[#0a0a0c] border-2 border-[#3a3a3a] text-[#cccccc] font-minecraft text-base tracking-wide px-3 py-1.5 outline-none rounded-sm caret-white resize-none focus:border-white focus:text-[#f0f0f0] transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#aaaaaa] tracking-wide mc-text-shadow leading-tight">Languages Used</span>
              <input
                type="text"
                value={editLangs}
                onChange={(e) => setEditLangs(e.target.value)}
                placeholder="e.g. C++, Java, Python"
                className="block w-full h-9 bg-[#0a0a0c] border-2 border-[#3a3a3a] text-[#cccccc] font-minecraft text-base tracking-wide px-3 outline-none rounded-sm caret-white focus:border-white focus:text-[#f0f0f0] transition-colors duration-150"
              />
            </div>

            <div className="flex gap-1.5 w-full mt-2">
              <MCButton className="flex-1" onClick={handleEditSave}>
                Save
              </MCButton>
              <MCButton className="flex-1" onClick={closeEditModal}>
                Cancel
              </MCButton>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
