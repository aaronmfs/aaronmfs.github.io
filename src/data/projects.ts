export interface ProjectEntry {
  id: string;
  title: string;
  summary: string;
  languages: string[];
  url?: string;
}

export const INITIAL_PROJECTS: ProjectEntry[] = [
  { id: 'proj-001', title: 'Discrete Event Simulation',           summary: 'Discrete-event simulation of a Mang Inasal restaurant branch, built with Python and SimPy.',         languages: ['Python', 'JavaScript', 'CSS3', 'HTML5'], url: 'https://github.com/aaronmfs/mang-inasal-des-simulation' },
  { id: 'proj-002', title: 'Dynamic Minecraft Server with Docker',           summary: 'Minecraft server with one command, while automatically backing up your world on every start.',         languages: ['Bash', 'Docker'], url: 'https://github.com/aaronmfs/mc-server-deployer' },
  { id: 'proj-003', title: 'Cortex',           summary: 'Personal Bash shell configuration framework and development environment toolkit, designed for Nobara KDE + Ghostty.',         languages: ['Bash', 'Docker'], url: 'https://github.com/aaronmfs/mc-server-deployer' },
];

export const LANG_COLORS: Record<string, string> = {
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Rust': '#CE412B',
  'Python': '#3776AB',
  'C#': '#178600',
  'Solidity': '#627EEA',
  'HTML5': '#E34F26',
  'CSS3': '#1572B6',
  'WebAssembly': '#654FF0',
  'Node.js': '#339933',
  'Go': '#00ADD8',
  'Java': '#007396',
  'PHP': '#777BB4',
  'Ruby': '#CC342D',
  'C': '#555555',
  'C++': '#00599C',
  'Zig': '#EC915F',
  'Swift': '#F05138',
  'Kotlin': '#7F52FF',
  'Dart': '#0175C2',
  'R': '#198CE7',
  'SQL': '#E48F08',
  'Julia': '#A270BA',
  'MATLAB': '#E16737',
  'Bash': '#89E051',
  'YAML': '#CB171E',
  'Docker': '#2496ED',
};

export const LANG_NORMALIZE: Record<string, string> = Object.fromEntries(
  Object.keys(LANG_COLORS).map((key) => [key.toLowerCase(), key])
);
