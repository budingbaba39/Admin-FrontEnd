import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './slices/adminAuthSlice';
import themeReducer from './slices/themeSlice';
import preloadReducer from './slices/preloadSlice';

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    theme: themeReducer,
    preload: preloadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
