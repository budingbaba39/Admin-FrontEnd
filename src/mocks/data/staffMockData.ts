import type { Staff } from '@/types/staff';

export const mockStaffList: Staff[] = [
  {
    id: 1,
    name: 'Admin User',
    username: 'mock',
    password: 'mockpass',
    status: 'ACTIVE',
    is_locked: false,
    is_deleted: false,
    created_at: '2025-11-10T10:00:00.000Z',
    updated_at: '2025-11-10T10:00:00.000Z',
    created_by_staff_id: 1,
    updated_by_staff_id: 1,
  },
  {
    id: 2,
    name: 'Staff Member',
    username: 'staffmock',
    password: 'staff123',
    status: 'ACTIVE',
    is_locked: false,
    is_deleted: false,
    created_at: '2025-11-11T09:00:00.000Z',
    updated_at: '2025-11-11T09:00:00.000Z',
    created_by_staff_id: 1,
    updated_by_staff_id: 1,
  },
  {
    id: 3,
    name: 'Test Staff',
    username: 'abcmock',
    password: '123mock',
    status: 'ACTIVE',
    is_locked: false,
    is_deleted: false,
    created_at: '2025-11-12T05:10:00.000Z',
    updated_at: '2025-11-12T05:10:00.000Z',
    created_by_staff_id: 1,
    updated_by_staff_id: 1,
  },
  {
    id: 4,
    name: 'Inactive Staff',
    username: 'inactive',
    password: 'test123',
    status: 'INACTIVE',
    is_locked: false,
    is_deleted: false,
    created_at: '2025-11-13T08:00:00.000Z',
    updated_at: '2025-11-13T08:00:00.000Z',
    created_by_staff_id: 1,
    updated_by_staff_id: 1,
  },
];

// In-memory staff list for CRUD operations (will reset on page refresh)
let runtimeStaffList = [...mockStaffList];

export const getMockStaffList = () => [...runtimeStaffList];

export const addMockStaff = (staff: Staff) => {
  runtimeStaffList.push(staff);
};

export const updateMockStaff = (id: number, updates: Partial<Staff>) => {
  const index = runtimeStaffList.findIndex(s => s.id === id);
  if (index !== -1) {
    runtimeStaffList[index] = { ...runtimeStaffList[index], ...updates };
  }
};

export const deleteMockStaff = (id: number) => {
  const index = runtimeStaffList.findIndex(s => s.id === id);
  if (index !== -1) {
    runtimeStaffList[index] = { ...runtimeStaffList[index], is_deleted: true };
  }
};

export const resetMockStaffList = () => {
  runtimeStaffList = [...mockStaffList];
};
