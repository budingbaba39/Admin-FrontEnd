import type {
  Staff,
  CreateStaffDTO,
  UpdateStaffDTO,
  GetAllStaffParams,
  GetAllStaffResponse,
} from '@/types/staff';
import { mockStaffApi } from '@/mocks';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

function getToken(): string | null {
  if (typeof document === 'undefined') {
    console.warn('getToken called on server-side, returning null');
    return null;
  }

  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith('adminToken='));

  if (!tokenCookie) {
    console.warn('adminToken cookie not found. Available cookies:', document.cookie);
    return null;
  }

  return tokenCookie.split('=')[1];
}

interface ApiResponse<T> {
  message: string;
  data: T;
  error: null | string;
}

export async function getAllStaff(params: GetAllStaffParams = {}): Promise<GetAllStaffResponse> {
  // Check if mock mode is enabled
  if (USE_MOCK_DATA) {
    return mockStaffApi.getAll(params);
  }

  const token = getToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.status) queryParams.append('status', params.status);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const url = `${API_URL}/admin/staff/get-all`;
  const fullUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Staff API error:', error);
      throw new Error(error.message || 'Failed to fetch staff');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
}

export async function createStaff(data: CreateStaffDTO): Promise<ApiResponse<Staff>> {
  // Check if mock mode is enabled
  if (USE_MOCK_DATA) {
    return mockStaffApi.create(data);
  }

  const token = getToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${API_URL}/admin/staff`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create staff');
  }

  return response.json();
}

export async function updateStaff(id: number, data: UpdateStaffDTO): Promise<ApiResponse<Staff>> {
  // Check if mock mode is enabled
  if (USE_MOCK_DATA) {
    return mockStaffApi.update(id, data);
  }

  const token = getToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${API_URL}/admin/staff/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update staff');
  }

  return response.json();
}

export async function deleteStaff(id: number): Promise<ApiResponse<Staff>> {
  // Check if mock mode is enabled
  if (USE_MOCK_DATA) {
    return mockStaffApi.delete(id);
  }

  const token = getToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(`${API_URL}/admin/staff/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete staff');
  }

  return response.json();
}
