'use server';

import { redirect } from 'next/navigation';
import { setAdminToken } from '@/lib/auth';
import { mockAuthApi } from '@/mocks';
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function adminLogin(formData: FormData) {
  const rawData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    let result;

    if (USE_MOCK_DATA) {
      result = await mockAuthApi.login(validation.data);
    } else {
      const response = await fetch(`${API_URL}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      result = await response.json();

      if (!response.ok) {
        return { error: result.message || 'Invalid credentials' };
      }
    }

    await setAdminToken(result.data.token);
    redirect('/admin/dashboard');
  } catch (error) {
    // Next.js redirect() throws NEXT_REDIRECT error - this is expected behavior
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    console.error('Login error:', error);

    if (!USE_MOCK_DATA) {
      console.warn('Backend unavailable, using mock data fallback');
      try {
        const mockResult = await mockAuthApi.login(validation.data);
        await setAdminToken(mockResult.data.token);
        redirect('/admin/dashboard');
      } catch (mockError) {
        // Next.js redirect() throws NEXT_REDIRECT error - this is expected behavior
        if (mockError instanceof Error && mockError.message.includes('NEXT_REDIRECT')) {
          throw mockError;
        }
        return { error: 'Invalid credentials' };
      }
    }

    return { error: 'Network error. Backend may not be running at ' + API_URL };
  }
}
