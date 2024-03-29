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

const dataSlice = createSlice({
  name: 'data',
  initialState: { products: [], loading: false, error: null },
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
      });
  },
});

export default dataSlice.reducer