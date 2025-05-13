// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Tidak perlu menambahkan redux-thunk secara manual di sini
});

export default store;
