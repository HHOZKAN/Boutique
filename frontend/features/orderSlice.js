import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../src/services/api';


// Action asynchrone
export const submitOrder = createAsyncThunk('orders/submitOrder', async (orderData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${orderData.token}`, 
            },
        };
        const body = {
            cart: orderData.cart, // Ajoutez les données du panier ici
            // Ajoutez d'autres données de commande ici
        };
        const { data } = await axios.post('http://localhost:5050/api/orders', body, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const submitPayment = createAsyncThunk('orders/submitPayment', async (paymentData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${paymentData.token}`, 
            },
        };
        const { data } = await axios.post('http://localhost:5050/api/orders/pay', paymentData, config);
        return data.clientSecret;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {},
        payment: { clientSecret: null, status: 'idle', error: null }, 
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
            })
            .addCase(submitPayment.pending, (state) => {
                state.payment.status = 'loading';
            })
            .addCase(submitPayment.fulfilled, (state, action) => {
                state.payment.status = 'succeeded';
                state.payment.clientSecret = action.payload;
            })
            .addCase(submitPayment.rejected, (state, action) => {
                state.payment.status = 'failed';
                state.payment.error = action.payload.message;
            });
    },
});

export default orderSlice.reducer;