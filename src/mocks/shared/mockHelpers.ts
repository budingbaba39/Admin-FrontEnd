/**
 * Shared Mock Utilities
 *
 * Helper functions used across all mock APIs
 */

/**
 * Simulate network delay
 */
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create a fake JWT token (Base64 encoded JSON) that can be decoded
 * Format: header.payload.signature
 */
export function createMockJWT(staff: { id: number; username: string; name: string }): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    id: staff.id,
    username: staff.username,
    name: staff.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  };

  // Convert to Base64 URL-safe format (remove padding '=' for JWT compatibility)
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '');
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '');
  const fakeSignature = btoa('mock-signature').replace(/=/g, '');

  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
}

/**
 * Generate random ID for mock data
 */
export function generateMockId(): number {
  return Math.floor(Math.random() * 10000) + 100;
}

/**
 * Get current timestamp in ISO format
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}
