/**
 * Mock APIs Central Export
 *
 * Import all mock APIs from this single file
 * Usage: import { mockAuthApi, mockStaffApi } from '@/mocks';
 */

// Export Auth Mock API
export { mockAuthApi } from './auth/authMockApi';

// Export Staff Mock API
export { mockStaffApi } from './staff/staffMockApi';

// Export Shared Utilities (if needed externally)
export { delay, createMockJWT, generateMockId, getCurrentTimestamp } from './shared/mockHelpers';

// Future exports:
// export { mockUserApi } from './user/userMockApi';
// export { mockTransactionApi } from './transaction/transactionMockApi';
