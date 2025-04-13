// mocks/user.ts
import { User } from '../types';

export const MOCK_USER = {
  DEFAULT: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'USER',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: '/avatar.jpg'
  } satisfies User,

  ADMIN: { // Chave em maiúsculas
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    phone: '+1 (555) 000-0000',
    address: '789 Admin Ave',
    image: '/avatar.jpg'
  } satisfies User,

  EMPTY: { // Chave em maiúsculas
    id: '3',
    name: '',
    email: '',
    role: 'USER',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    phone: '',
    address: '',
    image: '/avatar.jpg'
  } satisfies User
} as const;