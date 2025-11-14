import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStaff } from '@/services/staffService';
import type { Staff } from '@/types/staff';

interface PreloadState {
  staff: Staff[];
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  lastFetchedAt: number | null;
}

const initialState: PreloadState = {
  staff: [],
  isLoading: false,
  isLoaded: false,
  error: null,
  lastFetchedAt: null,
};

// Preload staff data after login
export const preloadStaffData = createAsyncThunk('preload/staff', async () => {
  const response = await getAllStaff({ limit: 1000 }); // Load all staff at once
  return response.data.data;
});

const preloadSlice = createSlice({
  name: 'preload',
  initialState,
  reducers: {
    clearPreloadData: state => {
      state.staff = [];
      state.isLoaded = false;
      state.lastFetchedAt = null;
      state.error = null;
    },
    // Manually update staff list after CRUD operations
    updatePreloadedStaff: (state, action) => {
      state.staff = action.payload;
      state.lastFetchedAt = Date.now();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(preloadStaffData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(preloadStaffData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.staff = action.payload;
        state.isLoaded = true;
        state.lastFetchedAt = Date.now();
      })
      .addCase(preloadStaffData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to preload data';
      });
  },
});

export const { clearPreloadData, updatePreloadedStaff } = preloadSlice.actions;
export default preloadSlice.reducer;
