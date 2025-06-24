import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('fetchUserById: Auth token:', auth.token);
      const response = await axios.get(`${API_URL}/users/${auth.user._id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log('fetchUserById: API response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'fetchUserById: API call failed:',
        error.response?.data || error.message,
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('updateProfile: Auth token:', auth.token);
      console.log('updateProfile: Data being sent:', userData);
      const response = await axios.put(
        `${API_URL}/users/${auth.user._id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      console.log('updateProfile: API response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'updateProfile: API call failed:',
        error.response?.data || error.message,
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ id, userData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(
        `${API_URL}/admin/users/${id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${API_URL}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userString = localStorage.getItem('user');
const user =
  userString && userString !== 'undefined' ? JSON.parse(userString) : null;
const token = localStorage.getItem('token') || null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
  allUsers: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.allUsers = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.accessToken);
        // Dispatch fetchUserById immediately after login to ensure full user details are fetched
        // The dispatch function is available via the thunkAPI object, which is the third argument to the async thunk
        // However, we cannot directly dispatch another thunk from within a fulfilled reducer.
        // This needs to be handled where the login thunk is dispatched (e.g., in Login.js).
        // For now, ensure that the login API response includes all necessary user details.
        // If not, we might need to adjust the backend's login response or call fetchUserById from Login.js.
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, _action) => {
        state.loading = false;
        state.user = _action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.allUsers = state.allUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        );
        if (state.user && state.user._id === updatedUser._id) {
          state.user = updatedUser;
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, _action) => {
        state.loading = false;
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== _action.payload,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
