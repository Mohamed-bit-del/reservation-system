import { User } from './types';

// Mock users for demonstration
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    role: 'user',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
];

export async function login(email: string, password: string): Promise<User | null> {
  // In a real app, this would verify credentials against a database
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  
  // Store user in localStorage
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem('user');
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
}