import type { Staff } from '@/types/staff';

export const mockStaff: Staff = {
  id: 1,
  name: 'Admin User',
  username: 'mock',
  password: 'mockpass',
  status: 'ACTIVE',
  is_locked: false,
  is_deleted: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockCredentials = {
  username: 'mock',
  password: 'mockpass',
};
