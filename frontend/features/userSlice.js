import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('http://localhost:5050/api/users/login', userData);
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('http://localhost:5050/api/users', userData);
        return data;
    } catch (err) {
        console.log(err.response.data);
        return rejectWithValue(err.response.data);
    }
});

export const getUserProfile = createAsyncThunk('user/profile', async (_, { rejectWithValue, getState }) => {
    const { user } = getState();
    try {
        const { data } = await axios.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        console.log('Data from API:', data); // Ajoutez ceci
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async (updatedUserData, { rejectWithValue, getState }) => {
    const { user } = getState();
    try {
        const { data } = await axios.put('http://localhost:5050/api/users/profile', updatedUserData, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        token: null,
        user: null,

    },
    reducers: {
        logoutUser: (state) => {
            // Suprime le token du local storage
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.token = null;
        },
        restoreUser: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                // STOCKE LE TOKEN DANS LE LOCAL STORAGE
                localStorage.setItem('token', action.payload.token);
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                console.log('Updating user state with:', action.payload); // Ajoutez ceci
                state.user = action.payload; 
            })

            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = { ...state.user, ...action.payload };
            })
    },

});

export const { logoutUser, restoreUser } = userSlice.actions;

export default userSlice.reducer;