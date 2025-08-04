import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice'; 
import authReducer from './authSlice';

// Only declare and export 'store' once, and include all your reducers here
export const store = configureStore({
  reducer: {
    example: exampleReducer,
    auth: authReducer,
    // Add more reducers as you build features
  },
});

// Types for useDispatch and useSelector hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
