/**
 * Staff Mock API
 *
 * Mock staff management endpoints for development without backend
 */

import { delay, generateMockId, getCurrentTimestamp } from '../shared/mockHelpers';
import { getMockStaffList, addMockStaff, updateMockStaff, deleteMockStaff } from './staffMockData';
import type { Staff, CreateStaffDTO, UpdateStaffDTO, GetAllStaffParams } from '@/types/staff';

export const mockStaffApi = {
  /**
   * Mock get all staff with pagination and filters
   */
  getAll: async (params: GetAllStaffParams = {}) => {
    await delay();

    let staffList = getMockStaffList().filter(s => !s.is_deleted);

    // Apply search filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      staffList = staffList.filter(
        s =>
          s.name.toLowerCase().includes(searchLower) ||
          s.username.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (params.status) {
      staffList = staffList.filter(s => s.status === params.status);
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedStaff = staffList.slice(startIndex, endIndex);

    return {
      message: 'Staff fetched successfully.',
      data: {
        totalCount: staffList.length,
        totalPage: Math.ceil(staffList.length / limit),
        currentPage: page,
        data: paginatedStaff,
      },
      error: null,
    };
  },

  /**
   * Mock create staff
   */
  create: async (staffData: CreateStaffDTO) => {
    await delay();

    const newStaff: Staff = {
      id: generateMockId(),
      name: staffData.name,
      username: staffData.username,
      password: staffData.password,
      status: staffData.status,
      is_locked: false,
      is_deleted: false,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
      created_by_staff_id: 1, // Mock admin user
      updated_by_staff_id: 1,
    };

    addMockStaff(newStaff);

    return {
      message: 'Staff created successfully.',
      data: newStaff,
      error: null,
    };
  },

  /**
   * Mock update staff
   */
  update: async (id: number, staffData: UpdateStaffDTO) => {
    await delay();

    const updates: Partial<Staff> = {
      ...staffData,
      updated_at: getCurrentTimestamp(),
      updated_by_staff_id: 1,
    };

    updateMockStaff(id, updates);

    const updatedStaff = getMockStaffList().find(s => s.id === id);

    if (!updatedStaff) {
      throw new Error(`Staff with id ${id} not found`);
    }

    return {
      message: 'Staff updated successfully.',
      data: updatedStaff,
      error: null,
    };
  },

  /**
   * Mock delete staff (soft delete)
   */
  delete: async (id: number) => {
    await delay();

    const staffToDelete = getMockStaffList().find(s => s.id === id);

    if (!staffToDelete) {
      throw new Error(`Staff with id ${id} not found`);
    }

    deleteMockStaff(id);

    return {
      message: 'Staff deleted successfully.',
      data: { ...staffToDelete, is_deleted: true },
      error: null,
    };
  },
};
