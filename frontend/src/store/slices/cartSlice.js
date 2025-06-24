import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${API_URL}/cart/active`, {
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

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ medicineId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('addToCart thunk: Attempting to add item.');
      console.log('Auth token:', auth.token);

      if (!auth.token) {
        console.error(
          'addToCart thunk: No authentication token found. Cannot proceed with API call.',
        );
        return rejectWithValue('No authentication token found. Please log in.');
      }

      const response = await axios.post(
        `${API_URL}/cart/add`,
        null, // No request body needed for x-www-form-urlencoded
        {
          params: { medicineId, quantity },
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      console.log(
        'addToCart thunk: API call successful. Response data:',
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error(
        'addToCart thunk: API call failed.',
        error.response?.data || error.message,
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ cartItemId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(
        `${API_URL}/cart/updateItemQuantity`,
        null, // No request body needed for x-www-form-urlencoded
        {
          params: { cartItemId, quantity },
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (medicineId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/items/${medicineId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (cartItemId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${API_URL}/cart/removeItem/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return cartItemId; // Return the removed item ID for reducer
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${API_URL}/cart/clear`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return []; // Return empty array for reducer
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  cart: null, // Stores the entire cart object
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // No synchronous reducers needed as all ops are async
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Cart Item Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove From Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // The backend should return the updated cart
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = { ...state.cart, items: [] }; // Set items to empty array
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove Cart Item by cartItemId
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart && state.cart.items) {
          state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
