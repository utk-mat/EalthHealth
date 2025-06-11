import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const fetchMedicines = createAsyncThunk(
  'medicine/fetchMedicines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/medicines`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMedicineById = createAsyncThunk(
  'medicine/fetchMedicineById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/medicines/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMedicinesByCategory = createAsyncThunk(
  'medicine/fetchMedicinesByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/medicines/category/${category}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchMedicines = createAsyncThunk(
  'medicine/searchMedicines',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/medicines/search?q=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeaturedMedicines = createAsyncThunk(
  'medicine/fetchFeaturedMedicines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/medicines/featured`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  medicines: [],
  featuredMedicines: [],
  currentMedicine: null,
  loading: false,
  error: null,
  categories: [],
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    clearMedicineError: (state) => {
      state.error = null;
    },
    setCurrentMedicine: (state, action) => {
      state.currentMedicine = action.payload;
    },
    updateMedicine: (state, action) => {
      const index = state.medicines.findIndex(medicine => medicine.id === action.payload.id);
      if (index !== -1) {
        state.medicines[index] = action.payload;
      }
    },
    createMedicine: (state, action) => {
      state.medicines.push(action.payload);
    },
    deleteMedicine: (state, action) => {
      state.medicines = state.medicines.filter(medicine => medicine.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
        state.categories = [...new Set(action.payload.map((m) => m.category))];
        state.featuredMedicines = action.payload.slice(0, 4);
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMedicineById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicineById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedicine = action.payload;
      })
      .addCase(fetchMedicineById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMedicinesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicinesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicinesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(searchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredMedicines = action.payload;
      })
      .addCase(fetchFeaturedMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearMedicineError,
  setCurrentMedicine,
  updateMedicine,
  createMedicine,
  deleteMedicine
} = medicineSlice.actions;
export default medicineSlice.reducer; 