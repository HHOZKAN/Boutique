import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone
export const submitOrder = createAsyncThunk('orders/submitOrder', async (orderData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${orderData.token}`, // Assure-toi de passer le token dans orderData
            },
        };
        const { data } = await axios.post('/api/orders', orderData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {},
        status: 'idle', // 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.order = action.payload;
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            });
    },
});

export default orderSlice.reducer;