// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  token: null,
  error: null,
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Thunk action untuk mengambil token
export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-username': process.env.REACT_APP_USERNAME,
        'x-password': process.env.REACT_APP_PASSWORD,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    console.log("Hello");
    const data = await response.json();
    dispatch(setToken(data.token)); // Menyimpan token ke Redux
    sessionStorage.setItem('authToken', data.token); // Simpan token ke sessionStorage jika perlu
  } catch (error) {
    dispatch(setError(error.message)); // Menyimpan error ke Redux jika gagal
  }
};

export const { setToken, setError } = authSlice.actions;

export default authSlice.reducer;
