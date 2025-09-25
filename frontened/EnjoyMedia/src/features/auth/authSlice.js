import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Signup thunk: we add a static role/user field here
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ fullname, email, password }, thunkAPI) => {
    try {
      const payload = { fullname, email, password, role: 'user' }; // role is hard-coded
      const res = await api.post('/auth/signup', payload);
      return res.data; // expect { message: 'User created', user: {..} } or similar
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      return res.data; // expect { user: {...}, token: '...' }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(signupUser.fulfilled, (s) => { s.loading = false; })
      .addCase(signupUser.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || a.error.message; })

      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || a.error.message; });
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
