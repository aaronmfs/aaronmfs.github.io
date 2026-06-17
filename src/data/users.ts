export interface UserEntry {
  id: string;
  username: string;
  password: string;
  role: string;
  fullName: string;
}

export const USERS: UserEntry[] = [
  { id: 'usr-001', username: 'admin', password: 'admin123', role: 'admin', fullName: 'Aaron Mathew F. Sinay' },
  { id: 'usr-002', username: 'teacher', password: 'teacher123', role: 'teacher', fullName: 'Joshua R. Rivera' },
  { id: 'usr-003', username: 'student', password: 'student123', role: 'student', fullName: 'Sofia Marie L. Cruz' },
];
