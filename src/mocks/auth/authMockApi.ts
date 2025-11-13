/**
 * Auth Mock API
 *
 * Mock authentication endpoints for development without backend
 */

import { delay, createMockJWT } from '../shared/mockHelpers';
import { mockStaff, mockCredentials } from './authMockData';
import { getMockStaffList } from '../staff/staffMockData';

export const mockAuthApi = {
  /**
   * Mock admin login - Check against staff list
   */
  login: async (credentials: { username: string; password: string }) => {
    await delay();

    // Get all staff (including the ones from staffMockData)
    const staffList = getMockStaffList();

    // Find staff with matching username and password
    const foundStaff = staffList.find(
      staff =>
        staff.username === credentials.username &&
        staff.password === credentials.password &&
        !staff.is_deleted &&
        staff.status === 'ACTIVE' &&
        !staff.is_locked
    );

    if (foundStaff) {
      // Create a fake JWT token with staff data in the payload
      const fakeJWT = createMockJWT(foundStaff);

      return {
        message: 'Log in successful.',
        data: {
          token: fakeJWT,
          staff: foundStaff,
        },
      };
    }

    // Fallback to old hardcoded credentials for backward compatibility
    if (
      credentials.username === mockCredentials.username &&
      credentials.password === mockCredentials.password
    ) {
      const fakeJWT = createMockJWT(mockStaff);

      return {
        message: 'Log in successful.',
        data: {
          token: fakeJWT,
          staff: mockStaff,
        },
      };
    }

    throw new Error('Invalid username or password');
  },

  /**
   * Mock token validation (for /admin/auth/me)
   */
  validateToken: async (token: string) => {
    await delay(200);

    if (token && (token.startsWith('mock-jwt-token') || token.includes('.'))) {
      return {
        message: 'Token valid',
        data: {
          staff: mockStaff,
        },
      };
    }

    throw new Error('Invalid token');
  },

  /**
   * Mock logout
   */
  logout: async () => {
    await delay(200);
    return {
      message: 'Logged out successfully',
    };
  },
};
