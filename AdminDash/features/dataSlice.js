import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get('http://localhost:5050/api/products')

  // TOTALPRICE
  const productsWithTotal = response.data.map(product => ({
    ...product,
    totalPrice: product.price * product.countInStock,
  }));

  return productsWithTotal;
})

export const createProduct = createAsyncThunk('data/createProduct', async (product) => {
  const response = await axios.post('http://localhost:5050/api/products', product);
  return response.data;
})

export const deleteProduct = createAsyncThunk('data/deleteProduct', async (id) => {
  await axios.delete(`http://localhost:5050/api/products/${id}`);
  return id;
})

export const fetchPayments = createAsyncThunk('data/fetchPayments', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get('http://localhost:5050/api/orders/payments', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { products: [], payments: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.loading = false;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;