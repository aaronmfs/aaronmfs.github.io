export interface UserEntry {
  id: string;
  username: string;
  password: string;
  role: string;
  fullName: string;
}

export const USERS: UserEntry[] = [
  { id: 'usr-001', username: 'admin', password: 'admin123', role: 'admin', fullName: 'Administrator' },
];
