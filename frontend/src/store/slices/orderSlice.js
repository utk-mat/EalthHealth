import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get(`${API_URL}/orders/user`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  },
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { getState }) => {
    const { auth } = getState();
    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  },
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId, { getState }) => {
    const { auth } = getState();
    const response = await axios.put(
      `${API_URL}/orders/${orderId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );
    return response.data;
  },
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    fetchOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateOrderStatus: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id,
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  clearOrderError,
  setCurrentOrder,
  fetchOrders,
  updateOrderStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
