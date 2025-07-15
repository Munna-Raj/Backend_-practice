// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import khaltiSlice from './khaltiSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    khalti: khaltiSlice,
    auth: authSlice,
  },
});

export default store;
