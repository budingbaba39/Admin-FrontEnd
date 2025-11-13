import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Staff {
  id: number;
  name: string;
  username: string;
  status: 'ACTIVE' | 'INACTIVE';
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

interface AdminAuthState {
  staff: Staff | null;
  isAuthenticated: boolean;
}

const initialState: AdminAuthState = {
  staff: null,
  isAuthenticated: false,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdminAuth: (state, action: PayloadAction<Staff>) => {
      state.staff = action.payload;
      state.isAuthenticated = true;
    },
    clearAdminAuth: state => {
      state.staff = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdminAuth, clearAdminAuth } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
