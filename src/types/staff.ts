export interface Staff {
  id: number;
  name: string;
  username: string;
  password?: string;
  status: 'ACTIVE' | 'INACTIVE';
  is_locked: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  created_by_staff_id?: number;
  updated_by_staff_id?: number;
  CreatedByStaff?: {
    id: number;
    name: string;
    username: string;
  };
  UpdatedByStaff?: {
    id: number;
    name: string;
    username: string;
  };
}

export interface CreateStaffDTO {
  name: string;
  username: string;
  password: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateStaffDTO {
  name?: string;
  username?: string;
  password?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface GetAllStaffParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetAllStaffResponse {
  message: string;
  data: {
    totalCount: number;
    totalPage: number;
    currentPage: number;
    data: Staff[];
  };
  error: null | string;
}
