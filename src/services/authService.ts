import { api } from './api';
import type { LoginDTO, AuthResponse } from '@/types/auth';

export const authService = {
  // Admin endpoints
  adminLogin: async (credentials: LoginDTO): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/admin/auth/login', credentials);
    return data;
  },

  adminLogout: async (): Promise<void> => {
    await api.post('/admin/auth/logout');
  },

  // Client endpoints (for future use)
  clientLogin: async (credentials: LoginDTO): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/client/auth/login', credentials);
    return data;
  },

  clientLogout: async (): Promise<void> => {
    await api.post('/client/auth/logout');
  },
};
