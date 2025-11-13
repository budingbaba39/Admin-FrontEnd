import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export interface Staff {
  id: number;
  name: string;
  username: string;
  status: 'ACTIVE' | 'INACTIVE';
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get authenticated admin staff from JWT token in cookie
 * No backend call needed - token validation happens on actual API calls
 */
export async function getAdminAuth(): Promise<Staff | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get('adminToken')?.value;

  if (!token) return null;

  try {
    // Decode URL encoding if present (Next.js may URL-encode cookie values)
    token = decodeURIComponent(token);

    // Decode JWT token (don't verify - backend will verify on API calls)
    const decoded = jwt.decode(token) as any;

    if (!decoded || !decoded.id || !decoded.username) {
      console.error('Token decode failed or missing required fields:', decoded);
      return null;
    }

    // Return minimal staff data from token
    // Full staff data will be fetched when needed via API calls
    return {
      id: decoded.id,
      username: decoded.username,
      name: decoded.name || decoded.username,
      status: 'ACTIVE',
      is_locked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

export async function requireAdminAuth(): Promise<Staff> {
  const staff = await getAdminAuth();
  if (!staff) {
    redirect('/login');
  }
  return staff;
}

export async function setAdminToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('adminToken', token, {
    httpOnly: false, // Allow client-side JavaScript to access the token
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function clearAdminToken() {
  const cookieStore = await cookies();
  cookieStore.set('adminToken', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
}

/**
 * Get the JWT token from cookie
 * Use this to send with API requests: Authorization: Bearer ${token}
 */
export async function getAdminToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('adminToken')?.value || null;
}
