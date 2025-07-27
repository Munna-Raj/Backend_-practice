import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const REGISTER_URL = 'http://localhost:5000/api/auth/register';
const LOGIN_URL = 'http://localhost:5000/api/auth/login';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(REGISTER_URL, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { msg: 'Registration failed' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(LOGIN_URL, credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { msg: 'Login failed' });
    }
  }
);

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    loading: false,
    error: null,
    success: !!token,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
        }
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.success = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
