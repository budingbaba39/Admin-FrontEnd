'use server';

import { redirect } from 'next/navigation';
import { clearAdminToken } from '@/lib/auth';
import { authService } from '@/services/authService';

export async function adminLogout() {
  try {
    // Call backend to invalidate session
    await authService.adminLogout();
  } catch (error) {
    console.error('Logout API error:', error);
    // Continue with client logout even if backend fails
  }

  // Clear the cookie
  await clearAdminToken();

  redirect('/login');
}
